---
title: 'Notes from #responsiveconf – Dan Donald'
date: 2014-06-28
permalink: "{{title | slug}}/index.html"
layout: layouts/post.njk
---
### Designing Evolution Elements

RWD is open to interpretation, even the nature of breakpoints.  
Device or content-oriented?

Device-agnostic = universality.

User-agent string tells the server nothing, but what would it change if you did know?

Modularity &#8211; [atomic design][1]. 

Breaking things down &#8211; [Pattern Lab][2].

Element Queries. What can the element do in its own context?

Trigger points. JS/PHP detection using normal CSS.

Start with the most primitive form. How could the layout of a module evolve? All progressive enhancement.

Ideal for responsive images &#8211; the image references its own container, not the viewport.

Should we use this now? Need to be responsible.

<div class="gallery gallery-205-1">
  <div class="row gallery-row">
    <div class="col-sm-3 col-lg-3">
      <a class="thumbnail img-thumbnail" href='https://mattrad.local/wp-content/uploads/2014/06/2014-06-27-12.03.46.jpg'><img width="150" height="150" src="https://mattrad.local/wp-content/uploads/2014/06/2014-06-27-12.03.46-150x150.jpg" class="attachment-thumbnail size-thumbnail" alt="" /></a>
    </div>
    
    <div class="col-sm-3 col-lg-3">
      <a class="thumbnail img-thumbnail" href='https://mattrad.local/wp-content/uploads/2014/06/2014-06-27-12.10.46.jpg'><img width="150" height="150" src="https://mattrad.local/wp-content/uploads/2014/06/2014-06-27-12.10.46-150x150.jpg" class="attachment-thumbnail size-thumbnail" alt="" /></a>
    </div>
    
    <div class="col-sm-3 col-lg-3">
      <a class="thumbnail img-thumbnail" href='https://mattrad.local/wp-content/uploads/2014/06/2014-06-27-12.18.55.jpg'><img width="150" height="150" src="https://mattrad.local/wp-content/uploads/2014/06/2014-06-27-12.18.55-150x150.jpg" class="attachment-thumbnail size-thumbnail" alt="Dan Donald slides from Responsive Conf" /></a>
    </div>
  </div>
</div>

 [1]: http://bradfrostweb.com/blog/post/atomic-web-design/
 [2]: http://patternlab.io/