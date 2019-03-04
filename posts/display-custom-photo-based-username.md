---
title: Display a custom photo based on username
date: 2014-08-12
permalink: "{{title | slug}}/index.html"
layout: layouts/post.njk
---
For this particular WordPress project, I needed to create a custom meta data field for users with Advanced Custom Fields, to allow them to upload their profile photo. I then created a team page, and wanted an easy way for them to add their photo to their team listing.

So, I had to:

  1. Get the user&#8217;s login &#8211; stored in a custom field, which they input on the Team edit page
  2. Use that to get the user&#8217;s ID
  3. Query the array containing the user&#8217;s metadata and find the custom photo
  4. Get the attachment URL of that photo
  5. Use that to display the photo, not forgetting to deference the array parameter <code style="font-size: medium;">[0]</code>

Phew!

It was also useful in displaying their custom photo on their Author page, which was a bit easier as I already had the user ID, so could user `get_the_author_meta`.