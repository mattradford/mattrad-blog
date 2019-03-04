---
title: WordPress and data collection
date: 2018-02-26
description: What does the software we use actually do, and does it work in our favour?
permalink: "{{title | slug}}/index.html"
layout: layouts/post.njk
---
What does the software we use actually do, and does it work in our favour?

## The plugin problem

At work at the end of November 2017, we ([10 Degrees][1]) received an email from Rocket Genius &#8211; developers of [Gravity Forms][2] &#8211; offering assistance during a coming upgrade.

&nbsp;

> Hi,
> 
> In the coming days, we&#8217;re going to be releasing version 2.3 of Gravity Forms which contains some significant changes to the database. This means that all your entry data will be copied into new tables and forms will not be able to receive new submissions during the migration.
> 
> I&#8217;m writing to you because, according to our records, you have some sites with a lot of entries and I&#8217;d very much like to oversee your migration personally and make sure that it goes as smoothly and as quickly as possible with minimal downtime for your users.
> 
> If you&#8217;d like me to give you a hand, please let me know and we&#8217;ll make a plan together.
> 
> Cheers,

We genuinely appreciate Rocket Genius reaching out to ensure a potentially breaking upgrade went smoothly. It’s a quality plugin and it’s reassuring to know the developers want to ensure things go well for customers. But this line caught our eye:

> …according to our records, you have some sites with a lot of entries…

Wait, how do Rocket Genius know how many entries our sites have? Are they recording this data?

We decided to investigate, and found a function called `get_remote_post_params()` in `/gravityforms/common.php`.

This function sends an array of data to a URL defined in `GRAVITY_MANAGER_PROXY_URL` as `http://proxy.gravityplugins.com`.

Here’s the array it sends:

<pre>$post = array(
'of' =&gt; 'gravityforms',
'key' =&gt; self::get_key(),
'v' =&gt; self::$version,
'wp' =&gt; get_bloginfo( 'version' ),
'php' =&gt; phpversion(),
'mysql' =&gt; $wpdb-&gt;db_version(),
'version' =&gt; '2',
'plugins' =&gt; $plugins,
'tn' =&gt; $theme_name,
'tu' =&gt; $theme_uri,
'tv' =&gt; $theme_version,
'ta' =&gt; $theme_author,
'tau' =&gt; $theme_author_uri,
'im' =&gt; $im,
'fc' =&gt; $fc,
'ec' =&gt; $entry_count,
'emc' =&gt; self::get_emails_sent(),
'api' =&gt; self::get_api_calls(),
'emeta' =&gt; $meta_counts['meta'],
'ed' =&gt; $meta_counts['details'],
'en' =&gt; $meta_counts['notes'],
'lang' =&gt; $lang
);
</pre>

This data comprises:

* our licence key  
* Gravity Forms version  
* WordPress core version  
* PHP version  
* MySQL version  
* active plugins  
* active theme name, URI, version, author and author URI  
* if it is a multisite  
* number of active and inactive forms  
* number of entries for active forms  
* number of emails sent by Gravity Forms  
* number of calls made to the Gravity Forms API  
* count of details, meta and notes associated with entries  
* language of the WordPress install

That&#8217;s a lot of data. It&#8217;s also being sent in the clear, not using `HTTPS`.

We had not been made aware that the Gravity Forms plugin would be sending this back to Rocket Genius.

**We emailed Rocket Genius twice about this issue, but have received no response.**

This is _not cool_. This sensitive telemetry about our websites is being collected without informing us, and without allowing us to opt-out.

## It&#8217;s only metadata

“But it’s only telemetry!”, I hear you say. That doesn’t matter; this is a issue that needs to be addressed. GDPR is going to be enforced from May 2018.

> GDPR will be an issue for telemetry data for startups and the industry’s biggest companies alike. Suppose, for example, you think, it’s all good, all the data we collect is scrubbed of personally identifiable information (PII). Yeah that’s right, data in the aggregate is OK of course. But what happens when you hit an exception, and ask the user to send a crash report? Suddenly the scrubbed data potentially becomes identifiable, and you’re storing it without knowing it. Triangulation of data, and the almost comical availability of third party datasets, makes it increasingly hard to assume any data is not personally identifiable.
> 
> http://redmonk.com/jgovernor/2017/11/17/gdpr-is-coming-your-telemetry-developer-and-user-data-ruh-roh/

It&#8217;s not just the law, it&#8217;s more than “You may be liable under GDPR”. It’s about transparent data collection and user respect. I may choose to share \*my\* data with Rocket Genius. My clients may choose to share their data. Or they may not, in which case, they need to have the option not to share. In fact, it needs to be assumed that they do not want to share unless explicit permission is given. This has to be the default in future in order that any data collected is agreed upon in advance, and that how that data is stored and destroyed is also made clear.

<img class="aligncenter size-large wp-image-828" src="https://mattrad.uk/wp-content/uploads/2018/02/Screen-Shot-2018-02-26-at-20.05.18-1024x164.png" alt="" width="1024" height="164" srcset="https://mattrad.local/wp-content/uploads/2018/02/Screen-Shot-2018-02-26-at-20.05.18-1024x164.png 1024w, https://mattrad.local/wp-content/uploads/2018/02/Screen-Shot-2018-02-26-at-20.05.18-300x48.png 300w, https://mattrad.local/wp-content/uploads/2018/02/Screen-Shot-2018-02-26-at-20.05.18-768x123.png 768w, https://mattrad.local/wp-content/uploads/2018/02/Screen-Shot-2018-02-26-at-20.05.18.png 1138w" sizes="(max-width: 1024px) 100vw, 1024px" /> 

There is currently no opt-out of data collection when you install Gravity Forms; I’ve just tried out the latest Release Candidate (v2.3 RC4) and this is still the case.

**This is against WordPress Developer Guidelines.**

> 7. Plugins may not track users without their consent.
> 
> In the interest of protecting user privacy, plugins may not contact external servers without explicit and authorized consent.  
> &#8230;  
> Some examples of prohibited tracking include:
> 
> Automated collection of user data without explicit confirmation from the user.

<https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/#7-plugins-may-not-track-users-without-their-consent>

Plugins should follow WordPress&#8217; privacy guidelines, and users should expect clear treatment &#8211; especially when they are paying customers.

## No opt-out, no opt-in

This is not just a single-plugin issue. How widespread is surreptitious data collection, in WordPress plugins and themes? It may be done with the best of intentions &#8211; to improve user experience &#8211; or it may be done to further business aspirations, but either way: the user has to be told and given the option to say &#8220;No&#8221;.

WordPress itself does a similar level of data collection with no easy opt-out. As of WP 4.9 there is a filter to disable data being sent back to wordpress.org’s API, using the `core_version_check_query_args` function, and I built [a small plugin][3] around this to make it easy for users. But a developer-focussed function isn&#8217;t nearly enough.

There is good discussion happening around data privacy in core &#8211; <https://make.wordpress.org/core/tag/gdpr-compliance/> &#8211; and a proposed roadmap for GDPR compliance &#8211; <https://make.wordpress.org/core/2018/02/19/proposed-roadmap-tools-for-gdpr-compliance/>. But there’s currently no proposal to add an opt-in for data collection, or a privacy statement to inform admin users when WordPress is installed. This was [proposed and closed in a Trac ticket][4], but even with that, the focus was “How can we collect data to improve WordPress?” rather than “How can we improve transparency in WordPress?”.

WooCommerce almost gets it right. On first activation you’re asked “Allow WooCommerce to collect non-sensitive diagnostic data and usage information.” But it’s pre-ticked and there’s no link to a data collection or privacy policy.

&nbsp;

<img class="aligncenter wp-image-826 size-large" src="https://mattrad.uk/wp-content/uploads/2018/02/Screen-Shot-2018-02-26-at-20.36.25-1024x360.png" alt="" width="1024" height="360" srcset="https://mattrad.local/wp-content/uploads/2018/02/Screen-Shot-2018-02-26-at-20.36.25-1024x360.png 1024w, https://mattrad.local/wp-content/uploads/2018/02/Screen-Shot-2018-02-26-at-20.36.25-300x105.png 300w, https://mattrad.local/wp-content/uploads/2018/02/Screen-Shot-2018-02-26-at-20.36.25-768x270.png 768w, https://mattrad.local/wp-content/uploads/2018/02/Screen-Shot-2018-02-26-at-20.36.25.png 1520w" sizes="(max-width: 1024px) 100vw, 1024px" /> 

&nbsp;

This isn&#8217;t good enough &#8211; we are developers and users of Open Source software, and should be open about what that software does.

Right now, the only way to know what data your website is sending to 3rd parties is to install a plugin called [Snitch][5], which monitors network connections. Go on, install it &#8211; you&#8217;ll be surprised at the data _your_ website is sending to someone else.

WordPress and the software built on top of it needs to address this issue, which isn&#8217;t about some annoying European law, it&#8217;s about respecting your users. Without that, it will be hard for agencies such as mine to honestly recommend solutions which do not respect us and our clients.

### Update 28/2/18

I received a reply from Carl Hancock of Rocket Genius on Twitter.

<div class="entry-content-asset">
  <blockquote class="twitter-tweet" data-width="550" data-dnt="true">
    <p lang="en" dir="ltr">
      How do people think software update and license key functionality works without sending a license key and information about the existing software to an license and update API to know if the key is valid and then if or how the update should occur? Magic? Voodoo? Mind reading?
    </p>
    
    <p>
      &mdash; Carl Hancock 🚀 (@carlhancock) <a href="https://twitter.com/carlhancock/status/968572862473887745?ref_src=twsrc%5Etfw">February 27, 2018</a>
    </p>
  </blockquote>
  
  <p>
    </div> 
    
    <p>
      This is missing the point &#8211; I have no problem with plugins sending data back in order to improve user experience and prevent websites breaking, but this must be explicit and opt-in. Saying &#8220;We&#8217;re doing this to help you&#8221; is fine as long as a user agrees to it, but not acceptable if a user has no option.
    </p>

 [1]: https://www.10degrees.uk
 [2]: https://www.gravityforms.com/
 [3]: https://wordpress.org/plugins/update-privacy
 [4]: https://core.trac.wordpress.org/ticket/38418
 [5]: https://wordpress.org/plugins/snitch/