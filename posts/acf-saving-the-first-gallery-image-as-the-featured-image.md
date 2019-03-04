---
title: ACF – Saving the first gallery image as the featured image
date: 2015-08-27
permalink: "{{title | slug}}/index.html"
layout: layouts/post.njk
---
I decided to use the Advanced Custom Fields Gallery field to show some images on a specific post type. Easy enough, but I wanted to set the featured image from the first gallery image, as there&#8217;s a performance hit involved in retrieving all those gallery arrays on, say an archive or search results page. A quick Googling and I found some code that almost did it:

<http://support.advancedcustomfields.com/forums/topic/display-1-gallery-picture-on-archive-page/>

The answer from marius.stuparu _almost_ did do the job, namely:

However, I noticed straight away a couple of problems. I&#8217;m using this in a functions.php file, i.e. outside the loop, so `global $post` was required, plus some changes to `get_field`.

But more than that, the code was giving a load of `trying to get property of non-object` errors when saving other post objects in the backend, such as menus. The solution was changing the hook from `save_post` to `save_post_{$post-type}`, which is documented in the [Codex entry][1] for `save_post`; its been there [since 3.7][2].

So the solution then, which doesn&#8217;t give any errors, is below.

 [1]: https://codex.wordpress.org/Plugin_API/Action_Reference/save_post
 [2]: http://adambrown.info/p/wp_hooks/hook/save_post_%7B$post-%3Epost_type%7D