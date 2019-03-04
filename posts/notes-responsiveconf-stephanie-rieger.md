---
title: 'Notes from #responsiveconf – Stephanie Rieger'
date: 2014-06-28
permalink: "{{title | slug}}/index.html"
layout: layouts/post.njk
---
### The Future of Media Queries

tl:dr; Level 4 MQs are not the right ones we need.

`@media (scripting)`

Apply a style based on JS availability.  
Why not build a site that doesn&#8217;t require JS? Not progressive.

More common are JS problems (doesn&#8217;t load / cascade / work).

`@media (light-level)`

low | normal | high

Undefined levels. Doing more harm than good?  
Shouldn&#8217;t device manufacturers be doing this? Which many are.  
What about a manual prompt using this MQ &#8211; is that appropriate?

`@media (pointer)`

Measures presence and accuracy of a pointing device.  
But there are multiple input mechanisms per device.

&#8220;Ensure everything works with a keyboard, mouse and touchscreen&#8221;.

`@media (hover)`

Again, multiple input mechanisms.

`@media (update-frequency)`

Modify content once it has rendered.

`@media(overflow-block|inline)`

What happens when content overflows the horizontal and vertical viewport size?

Are different media queries needed? e.g. Android components.

Take a construct, declare a UI, and let the device decide the most appropriate element to display. Not the current webs approach.