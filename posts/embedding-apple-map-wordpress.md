---
title: Embedding an Apple Map on a WordPress website using Mapkit JS
date: 2018-06-12
eleventyExcludeFromCollections: true

---
Apple announced MapKit JS at WWDC recently, and there are already some great demos available:

  * <https://mapkit-demo.herokuapp.com/> (source: <https://github.com/ankurp/mapkit-demo>)
  * <https://github.com/chrisdrackett/react-mapkit> (this shows lots of controls in use)
  * <https://github.com/vasile/mapkit-js-demo> (this shows a country outline drawn from a geoJSON file).

But how can we integrate this with WordPress? I use [Advanced Custom Fields Pro][1] quite a lot, so my first thought was &#8220;How can I work MapKit JS into ACF and provide user-customisable maps to clients?&#8221; There is already a Google Maps field type in ACF, so perhaps I can piggyback on that? But I&#8217;m getting ahead of myself.

## Pre-requisites

You thought it was just a matter of generating and adding an API key? Not so fast. Before you can embed a MapKit JS map, you will need:

  * an Apple developer account
  * your Apple developer Team ID
  * a maps identifier
  * a private key
  * a key identifier
  * a JWT (JSON Web Token)

Get an Apple Developer account if you don&#8217;t have one already. [9 to 5 Mac have a good guide to getting an account for free][2].

Then follow Apple&#8217;s Developer documentation here: <https://help.apple.com/developer-account/#/dev4bb1cc12b?sub=devc240e1a83>

> To communicate with the MapKit JS, you’ll use a Maps private key to sign one or more developer tokens.
> 
> First [register a Maps identifier][3]{#ember600.ember-view.xRef.Task.subTopicLink.active} to identify your app. Register a Maps identifier for each app that uses MapKit JS. Next [create and download a private key][4]{#ember601.ember-view.xRef.AppleTopic} with MapKit JS enabled and associate it with the Maps identifier. You can associate two keys with each Maps identifier.
> 
> Then [get the key identifier][5]{#ember602.ember-view.xRef.AppleTopic} (_kid_) to create a JSON web token (JWT) that you’ll use to communicate with the services you enabled.

Once you have a maps identifier, private key and key identifier, you can then generate a JWT.

_Phew_. This is starting to sound like a lot of work.

Especially as (ideally) Apple wants you to host a:

> `/services/jwt/` endpoint yourself. The endpoint should return a signed [JWT-token][6] which can then be used to authenticate against Apple endpoints.

See <https://blog.rubeng.nl/getting-started-with-apples-mapkit-js/> for (many) more details. But as the author Ruben Gommers points out in that post, you can also generate a token that will last up to 10 years, and negate the need to run an endpoint for token generation. So that&#8217;s something. But you still have to generate the JWT.

[Update 2017-09-12] Ruben contacted me to point out he has created a tool to create long-lived tokens. It&#8217;s available here: <https://mapkitjs.rubeng.nl>

Thankfully, Thomas Schoffelen has already created MapKit JWT for PHP: <https://github.com/includable/mapkit-jwt> 🙂 You pass his function a private key, key identifier and maps identifier, and it returns a JWT. It&#8217;s this token that you use much like a Google Maps API key in order to authorise initialization of your map.

Now we are getting somewhere.

## How do Mapkit JS embeds work?

Apple has demonstrated some embeds on its introductory page for developers: <https://developer.apple.com/maps/mapkitjs/>. Here&#8217;s the sample code for a simple embed:

<pre><code class="language-html" data-lang="html">&lt;span class="cp">&lt;!DOCTYPE html&gt;&lt;/span>
        &lt;span class="p">&lt;&lt;/span>&lt;span class="nt">html&lt;/span>&lt;span class="p">&gt;&lt;/span>
        &lt;span class="p">&lt;&lt;/span>&lt;span class="nt">head&lt;/span>&lt;span class="p">&gt;&lt;/span>
        &lt;span class="p">&lt;&lt;/span>&lt;span class="nt">meta&lt;/span> &lt;span class="na">charset&lt;/span>&lt;span class="o">=&lt;/span>&lt;span class="s">"utf-8"&lt;/span>&lt;span class="p">&gt;&lt;/span>
        
        &lt;span class="p">&lt;&lt;/span>&lt;span class="nt">script&lt;/span> &lt;span class="na">src&lt;/span>&lt;span class="o">=&lt;/span>&lt;span class="s">"https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js"&lt;/span>&lt;span class="p">&gt;&lt;/&lt;/span>&lt;span class="nt">script&lt;/span>&lt;span class="p">&gt;&lt;/span>
        
        &lt;span class="p">&lt;&lt;/span>&lt;span class="nt">style&lt;/span>&lt;span class="p">&gt;&lt;/span>
        &lt;span class="p">#&lt;/span>&lt;span class="nn">map&lt;/span> &lt;span class="p">{&lt;/span>
            &lt;span class="k">width&lt;/span>&lt;span class="p">:&lt;/span> &lt;span class="mi">100&lt;/span>&lt;span class="kt">%&lt;/span>&lt;span class="p">;&lt;/span>
            &lt;span class="k">height&lt;/span>&lt;span class="p">:&lt;/span> &lt;span class="mi">600&lt;/span>&lt;span class="kt">px&lt;/span>&lt;span class="p">;&lt;/span>
        &lt;span class="p">}&lt;/span>
        &lt;span class="p">&lt;/&lt;/span>&lt;span class="nt">style&lt;/span>&lt;span class="p">&gt;&lt;/span>
        
        &lt;span class="p">&lt;/&lt;/span>&lt;span class="nt">head&lt;/span>&lt;span class="p">&gt;&lt;/span>
        
        &lt;span class="p">&lt;&lt;/span>&lt;span class="nt">body&lt;/span>&lt;span class="p">&gt;&lt;/span>
        &lt;span class="p">&lt;&lt;/span>&lt;span class="nt">div&lt;/span> &lt;span class="na">id&lt;/span>&lt;span class="o">=&lt;/span>&lt;span class="s">"map"&lt;/span>&lt;span class="p">&gt;&lt;/&lt;/span>&lt;span class="nt">div&lt;/span>&lt;span class="p">&gt;&lt;/span>
        
        &lt;span class="p">&lt;&lt;/span>&lt;span class="nt">script&lt;/span>&lt;span class="p">&gt;&lt;/span>
        &lt;span class="nx">mapkit&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">init&lt;/span>&lt;span class="p">({&lt;/span>
            &lt;span class="nx">authorizationCallback&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">done&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
                &lt;span class="kd">var&lt;/span> &lt;span class="nx">xhr&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="k">new&lt;/span> &lt;span class="nx">XMLHttpRequest&lt;/span>&lt;span class="p">();&lt;/span>
                &lt;span class="nx">xhr&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">open&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"GET"&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="s2">"/services/jwt"&lt;/span>&lt;span class="p">);&lt;/span>
                &lt;span class="nx">xhr&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">addEventListener&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"load"&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">()&lt;/span> &lt;span class="p">{&lt;/span>
                    &lt;span class="nx">done&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="k">this&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">responseText&lt;/span>&lt;span class="p">);&lt;/span>
                &lt;span class="p">});&lt;/span>
                &lt;span class="nx">xhr&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">send&lt;/span>&lt;span class="p">();&lt;/span>
            &lt;span class="p">}&lt;/span>
        &lt;span class="p">});&lt;/span>
        
        &lt;span class="kd">var&lt;/span> &lt;span class="nx">Cupertino&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="k">new&lt;/span> &lt;span class="nx">mapkit&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">CoordinateRegion&lt;/span>&lt;span class="p">(&lt;/span>
            &lt;span class="k">new&lt;/span> &lt;span class="nx">mapkit&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">Coordinate&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mf">37.3316850890998&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="o">-&lt;/span>&lt;span class="mf">122.030067374026&lt;/span>&lt;span class="p">),&lt;/span>
            &lt;span class="k">new&lt;/span> &lt;span class="nx">mapkit&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">CoordinateSpan&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mf">0.167647972&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">0.354985255&lt;/span>&lt;span class="p">)&lt;/span>
        &lt;span class="p">);&lt;/span>
        &lt;span class="kd">var&lt;/span> &lt;span class="nx">map&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="k">new&lt;/span> &lt;span class="nx">mapkit&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">Map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"map"&lt;/span>&lt;span class="p">);&lt;/span>
        &lt;span class="nx">map&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">region&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">Cupertino&lt;/span>&lt;span class="p">;&lt;/span>
        &lt;span class="p">&lt;/&lt;/span>&lt;span class="nt">script&lt;/span>&lt;span class="p">&gt;&lt;/span>
        &lt;span class="p">&lt;/&lt;/span>&lt;span class="nt">body&lt;/span>&lt;span class="p">&gt;&lt;/span>
        &lt;span class="p">&lt;/&lt;/span>&lt;span class="nt">html&lt;/span>&lt;span class="p">&gt;&lt;/span></code></pre>

Breaking this down, we have:

**Link to the MapKit JS library**

<pre><code class="language-html" data-lang="html">&lt;span class="p">&lt;&lt;/span>&lt;span class="nt">script&lt;/span> &lt;span class="na">src&lt;/span>&lt;span class="o">=&lt;/span>&lt;span class="s">"https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js"&lt;/span>&lt;span class="p">&gt;&lt;/&lt;/span>&lt;span class="nt">script&lt;/span>&lt;span class="p">&gt;&lt;/span></code></pre>

**Define the map size**

<pre><code class="language-html" data-lang="html">&lt;span class="p">&lt;&lt;/span>&lt;span class="nt">style&lt;/span>&lt;span class="p">&gt;&lt;/span>
&lt;span class="p">#&lt;/span>&lt;span class="nn">map&lt;/span> &lt;span class="p">{&lt;/span>
&lt;span class="k">width&lt;/span>&lt;span class="p">:&lt;/span> &lt;span class="mi">100&lt;/span>&lt;span class="kt">%&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="k">height&lt;/span>&lt;span class="p">:&lt;/span> &lt;span class="mi">600&lt;/span>&lt;span class="kt">px&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="p">}&lt;/span>
&lt;span class="p">&lt;/&lt;/span>&lt;span class="nt">style&lt;/span>&lt;span class="p">&gt;&lt;/span></code></pre>

**Give the map JS a target in the DOM**

<pre><code class="language-html" data-lang="html">&lt;span class="p">&lt;&lt;/span>&lt;span class="nt">div&lt;/span> &lt;span class="na">id&lt;/span>&lt;span class="o">=&lt;/span>&lt;span class="s">"map"&lt;/span>&lt;span class="p">&gt;&lt;/&lt;/span>&lt;span class="nt">div&lt;/span>&lt;span class="p">&gt;&lt;/span></code></pre>

**Initialise, set map parameters and attach it to the DOM element**

<pre><code class="language-html" data-lang="html"> &lt;span class="nx">mapkit&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">init&lt;/span>&lt;span class="p">({&lt;/span>
            &lt;span class="nx">authorizationCallback&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">done&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
                &lt;span class="kd">var&lt;/span> &lt;span class="nx">xhr&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="k">new&lt;/span> &lt;span class="nx">XMLHttpRequest&lt;/span>&lt;span class="p">();&lt;/span>
                &lt;span class="nx">xhr&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">open&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"GET"&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="s2">"/services/jwt"&lt;/span>&lt;span class="p">);&lt;/span>
                &lt;span class="nx">xhr&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">addEventListener&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"load"&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">()&lt;/span> &lt;span class="p">{&lt;/span>
                    &lt;span class="nx">done&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="k">this&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">responseText&lt;/span>&lt;span class="p">);&lt;/span>
                &lt;span class="p">});&lt;/span>
                &lt;span class="nx">xhr&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">send&lt;/span>&lt;span class="p">();&lt;/span>
            &lt;span class="p">}&lt;/span>
        &lt;span class="p">});&lt;/span>
        
        &lt;span class="kd">var&lt;/span> &lt;span class="nx">Cupertino&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="k">new&lt;/span> &lt;span class="nx">mapkit&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">CoordinateRegion&lt;/span>&lt;span class="p">(&lt;/span>
            &lt;span class="k">new&lt;/span> &lt;span class="nx">mapkit&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">Coordinate&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mf">37.3316850890998&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="o">-&lt;/span>&lt;span class="mf">122.030067374026&lt;/span>&lt;span class="p">),&lt;/span>
            &lt;span class="k">new&lt;/span> &lt;span class="nx">mapkit&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">CoordinateSpan&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mf">0.167647972&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">0.354985255&lt;/span>&lt;span class="p">)&lt;/span>
        &lt;span class="p">);&lt;/span>
        &lt;span class="kd">var&lt;/span> &lt;span class="nx">map&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="k">new&lt;/span> &lt;span class="nx">mapkit&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">Map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"map"&lt;/span>&lt;span class="p">);&lt;/span>
        &lt;span class="nx">map&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">region&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">Cupertino&lt;/span>&lt;span class="p">;&lt;/span></code></pre>

All in all, this looks a lot like the ACF documentation for adding a Google Map: <https://www.advancedcustomfields.com/resources/google-map/>.

## WordPress integration

To get this integrated into a WordPress website I will:

  * add the MapKit JWT library
  * create a settings page to store Team ID, Key ID, Private Key and origin
  * store those in `wp_options`
  * generate a JWT and store that in `wp_options` as well
  * enqueue the MapKit JS CDN and custom map JS
  * initialise and display the map using a shortcode

## And here&#8217;s the result:

&nbsp;

<div id="map">
</div>

&nbsp;

To do this I&#8217;ve created a plugin. It&#8217;s just a demo of a simple embed but does output an Apple Map 🙂  Even this was certainly more effort than using a Google Maps embed, and a lot more work than I was expecting. The next step will be to integrate custom markers, controlled using an ACF repeater. Any questions, please contact me on Twitter or raise an issue on Github.

You can get the plugin here: <https://github.com/mattradford/apple-map-embed>.

 [1]: https://www.advancedcustomfields.com/
 [2]: https://9to5mac.com/2016/03/27/how-to-create-free-apple-developer-account-sideload-apps/
 [3]: https://help.apple.com/developer-account/#/dev4bb1cc12b?sub=devc240e1a83
 [4]: https://help.apple.com/developer-account/#/devcdfbb56a3?sub=devc240e1a83
 [5]: https://help.apple.com/developer-account/#/dev646934554?sub=devc240e1a83
 [6]: https://jwt.io/