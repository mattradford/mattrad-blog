---
title: Gravity Forms CSS spinner
date: 2016-06-17
permalink: "{{title | slug}}/index.html"
layout: layouts/post.njk
---
When you submit a form the Gravity Forms default spinner appears. It is a gif, which doesn&#8217;t look great when used on anything but a white background, and isn&#8217;t retina-friendly. Let&#8217;s sort that out.

RocketGenius have [documentation for the ajax spinner][1] and from that I&#8217;ve created a filter:

&nbsp;

&nbsp;

This replaced the default `loader.gif` with a base64-encoded transparent gif, taken from a [CSS Tricks code snippet][2]. I then added some CSS modified from [@lukehass][3]&#8216; [Single Element CSS Spinners][4].

&nbsp;

&nbsp;

The CSS above isn&#8217;t prefixed, so run it through autoprefixer or similar. You could also easily replace the blank loader gif with an SVG instead for endless customised spinners.

 [1]: https://www.gravityhelp.com/documentation/article/gform_ajax_spinner_url
 [2]: https://css-tricks.com/snippets/html/base64-encode-of-1x1px-transparent-gif/
 [3]: http://twitter.com/lukehaas
 [4]: http://projects.lukehaas.me/css-loaders/