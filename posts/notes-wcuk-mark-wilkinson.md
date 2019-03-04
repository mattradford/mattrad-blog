---
title: 'Notes from #wcuk – Mark Wilkinson'
date: 2014-07-12
permalink: "{{title | slug}}/index.html"
layout: layouts/post.njk
---
### Extensible Plugins

31491 plugins: can&#8217;t always find the one you need to do the job

Help others make a tiny tweak by making plugins extensible.

This is about plugins, but also applicable to themes.

&#8220;One that can be modified or extended without changing the plugin code itself.&#8221;

### Why?

Safe modification.  
Much more popular in WP Plugin Directory!

### Tools & Functions

Actions & Filters

`do_action();`  
&#8211; a hook to add functionality at that point

Create a function, and add an action, e.g. to 2014 footer.php

`apply_filters();`  
&#8211; filter the data that WP works with before its seen by the user

E.g. wanted to add a link to a Twitter user within a tweet widget. Looked for class wrapping the user. Searched the plugin for that class, and found an apply_filters string. Don&#8217;t need to edit plugin.

Wrote a simple function to user that filter.

### Where should we use these actions & filters?

1) Setting up arrays  
2) Before/after HTML output  
3) Before/after setup

E.g. instead of just declaring an array, pass it through a filter first.

#### Template Overides

Can use a filter to override template files, e.g. WooCommerce does this.

[<img class="aligncenter size-large wp-image-255" src="http://mattrad.uk/wp-content/uploads/2014/07/wpmark1-1024x768.jpg" alt="wpmark1" width="1024" height="768" srcset="https://mattrad.local/wp-content/uploads/2014/07/wpmark1-1024x768.jpg 1024w, https://mattrad.local/wp-content/uploads/2014/07/wpmark1-300x225.jpg 300w" sizes="(max-width: 1024px) 100vw, 1024px" />][1]

[<img class="aligncenter size-large wp-image-256" src="http://mattrad.uk/wp-content/uploads/2014/07/wpmark2-1024x811.jpg" alt="wpmark2" width="1024" height="811" srcset="https://mattrad.local/wp-content/uploads/2014/07/wpmark2-1024x811.jpg 1024w, https://mattrad.local/wp-content/uploads/2014/07/wpmark2-300x237.jpg 300w" sizes="(max-width: 1024px) 100vw, 1024px" />][2]

[<img class="aligncenter size-large wp-image-257" src="http://mattrad.uk/wp-content/uploads/2014/07/wpmark3-1024x784.jpg" alt="wpmark3" width="1024" height="784" srcset="https://mattrad.local/wp-content/uploads/2014/07/wpmark3-1024x784.jpg 1024w, https://mattrad.local/wp-content/uploads/2014/07/wpmark3-300x229.jpg 300w" sizes="(max-width: 1024px) 100vw, 1024px" />][3]

[<img class="aligncenter size-large wp-image-258" src="http://mattrad.uk/wp-content/uploads/2014/07/wpmark4-1024x785.jpg" alt="wpmark4" width="1024" height="785" srcset="https://mattrad.local/wp-content/uploads/2014/07/wpmark4-1024x785.jpg 1024w, https://mattrad.local/wp-content/uploads/2014/07/wpmark4-300x229.jpg 300w" sizes="(max-width: 1024px) 100vw, 1024px" />][4]

 [1]: http://mattrad.uk/wp-content/uploads/2014/07/wpmark1.jpg
 [2]: http://mattrad.uk/wp-content/uploads/2014/07/wpmark2.jpg
 [3]: http://mattrad.uk/wp-content/uploads/2014/07/wpmark3.jpg
 [4]: http://mattrad.uk/wp-content/uploads/2014/07/wpmark4.jpg