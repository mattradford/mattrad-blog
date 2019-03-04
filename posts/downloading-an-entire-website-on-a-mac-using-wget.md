---
title: Downloading an entire website on a Mac using wget
date: 2014-04-28
description: I recently had to take a copy of a client’s website before they transferred from another provider. It was running an old copy of Joomla, and getting backend access proved difficult. Solution? Copy the whole site using wget.
permalink: "{{title | slug}}/index.html"
layout: layouts/post.njk
---
I recently had to take a copy of a client&#8217;s website before they transferred from another provider. It was running an old copy of Joomla, and getting backend access proved difficult. So we opted to grab a static copy of the site and keep that live until we had their new WordPress website ready.

There are plenty of apps out there that will download whole websites for you, but the simplest way is to use [wget][1]. If you don&#8217;t have a copy, you can install wget on a Mac without using MacPorts or HomeBrew using [this guide from OS X Daily][2].

Once it&#8217;s installed, open Terminal and type:

<pre class="prettyprint lang-bsh">wget -help</pre>

You&#8217;ll see there are a ton of options. At it&#8217;s simplest, you can just type: 

<pre class="prettyprint lang-bsh">wget example.com</pre>

That will download a copy of the index page of example.com to whichever directory you&#8217;re calling wget from in Terminal. But I wanted to get a copy of the whole website, and have it to work locally, i.e. using root-relative URLs, rather than referring back to example.com live on the web.

So here&#8217;s the code:

<pre class="prettyprint lang-bsh">wget --recursive --no-clobber --page-requisites --html-extension --convert-links --restrict-file-names=windows --random-wait --domains example.com --no-parent www.example.com</pre>

Let&#8217;s step through the options used:

<pre class="prettyprint lang-bsh">--recursive</pre>

Recrusively download the directories, up to a max of 5 deep.

<pre class="prettyprint lang-bsh">--no-clobber</pre>

Can also use &#8220;-nc&#8221;. Stops the same files on a server being downloaded more than once.

<pre class="prettyprint lang-bsh">--page-requisites</pre>

Causes Wget to download all the files that are necessary to properly display a given HTML page. Including such things as inlined images, sounds, and referenced stylesheets.

<pre class="prettyprint lang-bsh">--html-extension</pre>

Renames HTML files as .html. Handy for converting PHP-based sites, such as the Joomla one I needed to copy.

<pre class="prettyprint lang-bsh">--convert-links</pre>

After the download is complete, convert the links in the document to make them suitable for local viewing.

<pre class="prettyprint lang-bsh">--restrict-file-names=windows</pre>

Escapes characters to make them safe on your local system.

<pre class="prettyprint lang-bsh">--random-wait</pre>

Don&#8217;t act like we&#8217;re downloading the whole site&#8230;

<pre class="prettyprint lang-bsh">--domains example.com</pre>

The domain you want to download the whole site from.

<pre class="prettyprint lang-bsh">--no-parent www.example.com</pre>

Do not ever ascend to the parent directory when retrieving recursively.

After all that you&#8217;re left with a folder that should be a complete copy of the domain you&#8217;ve targeted. Very handy.

However, typing all that is a bit of a pain. I think a bash script taking the domain as an input would save the pain of typing all that out, maybe even wrap it up into an app using [Appify][3]. Hmm, one for the to-do list.

 [1]: https://www.gnu.org/software/wget/
 [2]: http://osxdaily.com/2012/05/22/install-wget-mac-os-x/
 [3]: http://mathiasbynens.be/notes/shell-script-mac-apps