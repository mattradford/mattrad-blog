---
title: Eleventy reasons to move from WordPress
description: WordPress is great but there's more out there.
date: 2019-05-27
---

WordPress pays my wages. It enables me (and many others) to create flexible and extensible websites for clients. It’s fair to say, after years of working with it, that I know it inside out. 

But there’s more out there. When I decided to rebuild my own website, I wanted something different. Something that would stretch me, help me learn more JavaScript, write in Markdown, and which would be output in static HTML. And be more *fun*. Enter **Eleventy**. 

[Eleventy](https://www.11ty.io) is a static site generator written in JS. There are a few starter packages available - I forked from [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog). This gave me a head start with a few blogging bits, such as a RSS feed. 

## What have I learnt or added so far?

- The [Nunjucks](https://mozilla.github.io/nunjucks/) templating language, including how to manipulate loops
- Added Gulp asset building, which also runs `npx eleventy —serve` to build the site
- Forcing post permalinks to use a `%postname%` equivalent to WordPress 
- Allowing post permalinks to redirect to an external link
- Date format handling using [luxon](https://moment.github.io/luxon/index.html) 
- Generating read time 
	- Removed for now as most posts were coming in at “About 1 min. read time”, so what’s the point? I’d like to make it conditional on > 1 minute.  
- Allowing for some fuzzy dates, for the older repost material that I’m finding in the depths of my hard drives

## What’s left to do?

Many many things. 

- Applying a design. But I’m trying to focus on the content first, otherwise I’ll get distracted by all the *shiny*. So the CSS will have to wait. 
- Clean up the root directory, as there are files scattered everywhere right now
- Inserting images (sorry [Lynx](https://lynx.browser.org) users)
- Inserting images as `<figure>`, which will probably need a Nunjucks macro
- Output one year indicator per collection of posts in that year. This is surprisingly involved, especially as Nunjucks doesn’t have `foreach` loops. 
- A proper draft status, rather than keeping them in a non-processed directory
- Figure out how to schedule posts, and have Netlify build on a schedule
- Auto-posting to Twitter (using a [Netlify lambda function](https://www.netlify.com/docs/functions/))
- [Webmentions](https://indieweb.org/Webmention)
- Remove Gulp and use `npm` for asset compilation

“You could have saved yourself a lot of bother and just stuck with WordPress”. Well yes, but the point is to learn and expand my horizons. Everything I’ve learnt so far is visible and available to others on Github at [https://github.com/mattradford/mattrad-uk](https://github.com/mattradford/mattrad-uk). [Others have done the same](https://www.11ty.io/docs/sites/). 

I can now write this post in [IA Writer](https://ia.net/writer) on my phone, push to my website’s git repo (using [Working Copy](https://workingcopyapp.com)), which Netlify will then build and deploy. It’s not going to be everyone’s cup of tea but I’m loving it. Forward!