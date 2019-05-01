---
title: 'Notes from #wcuk – @jonnya'
date: 2014-07-12
eleventyExcludeFromCollections: true

---
### Designing with Data

Content detection can be brittle (limited)  
&#8211; i.e. detecting page IDs

  * More creative flexibility
  * Bespoke editing
  * Accomodate future development

#### Structure data

&#8211; content & design elements  
-\*\* functionality?\*\*  
What needs to be editable?  
&#8211; e.g. don&#8217;t let clients alter theme colours

What needs to be queried?  
&#8211; do you need to get to data attributes to alter what is displayed on the page?

How to achieve the design requirements?

e.g. instead of creating different templates for differently coloured pages, why not use a custom field that is pre-poulated in the edit screen, which targets a class

#### Data attributes

  * Page/post hierarchy
  * Post types/formats
  * Tags/categories
  * Custom tax.
  * Custom fields
  * Images/attachments

#### Design attributes:

General static(isj) design/structure  
Editable WP menus  
Editable Widget areas  
&#8211; Jonny has a plugin to remove widgets, to leave in only the only that they need, and not allow breaking  
Archive views

Sophistication using template hierarchy, esp taxonomies

#### Content Detection

&#8211; CSS  
&#8211; body and post class  
PHP  
&#8211; post id  
&#8211; query variables  
&#8211; `is_page()` etc  
&#8211; has post image  
&#8211; has widgets

Can alter body class with a filter, add a custom name.  
&#8211; all sort of content detection, then add a body class

Content detection with PHP  
e.g. Displaying a fallback image if there&#8217;s no post_thumbnail.  
(I do that already &#8211; sweet!)

`get_` on a function returns it rather than echos output, e.g. `get_the_post_thumbnail($post_id)` rather than `the_post_thumbnail($post_id)`

`is_active_sidebar( $name-or-id)`  
(has a user dragged widgets into an active widget area?)

`pre_get_posts`  
Super-powerful. Don&#8217;t let it mess with the admin!

#### What about data input?

Validate user input  
Always escape on output  
Escape late  
Use `$wpdb` class for the database

More coming:

WP-API  
WP metabox API