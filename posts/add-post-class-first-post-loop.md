---
title: Add a post class to the first post in a loop
date: 2015-01-29T12:09:14+00:00
eleventyExcludeFromCollections: true

---
I&#8217;m sure you could also do this with `pre_get_posts`, but this works nicely, replacing `post_class()` within the `article` block.

Could also be done with CSS `:first-child` of course.