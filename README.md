# mattrad.uk

This website was originally forked from [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog), a starter repository showing how to build a blog with the [Eleventy](https://github.com/11ty/eleventy) static site generator.

I'm redesigning the website in the open, posting what I learn as I go. The website is hosted on [Netlify](https://www.netlify.com/). 

## Get your own Eleventy web site on Netlify

It's very easy. Click one of these links to create a site based on [mattrad.uk](https://app.netlify.com/start/deploy?repository=https://github.com/mattradford/mattrad-uk) or [eleventy-base-blog](https://app.netlify.com/start/deploy?repository=https://github.com/11ty/eleventy-base-blog)

Seriously, just click OK a few times and it’ll be live. Netlify is quite amazing.

## Getting started with a copy of this repository

### 1. Clone this repository:

```
git clone https://github.com/mattradford/mattrad-uk.git your-site-name
```

### 2. Navigate to the directory

```
cd your-site-name
```

Specifically have a look at `.eleventy.js` to see if you want to configure any Eleventy options differently.

### 3. Install dependencies

```
npm install
```

### 4. Edit _data/metadata.json

### 5. Run Eleventy

```
npx eleventy
```

Or build automatically when a template changes:
```
npx eleventy --watch
```

Or in debug mode:
```
DEBUG=* npx eleventy
```

### Implementation Notes

* `about/index.md` shows how to add a content page.
* `posts/` has the blog posts but really they can live in any directory. They need only the `post` tag to be added to this collection.
* Add the `nav` tag to add a template to the top level site navigation. For example, this is in use on `index.njk` and `about/index.md`.
* Content can be any template format (blog posts needn’t be markdown, for example). Configure your supported templates in `.eleventy.js` -> `templateFormats`.
	* Because `css` and `png` are listed in `templateFormats` but are not supported template types, any files with these extensions will be copied without modification to the output (while keeping the same directory structure).
* The blog post feed template is in `feed/feed.njk`. This is also a good example of using a global data files in that it uses `_data/metadata.json`.
* This example uses three layouts:
  * `_includes/layouts/base.njk`: the top level HTML structure
  * `_includes/layouts/home.njk`: the home page template (wrapped into `base.njk`)
  * `_includes/layouts/post.njk`: the blog post template (wrapped into `base.njk`)
* `_includes/postlist.njk` is a Nunjucks include and is a reusable component used to display a list of all the posts. `index.njk` has an example of how to use it.
