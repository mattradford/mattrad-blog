---
title: Hide WP Engine Legacy Staging
description: Scratching a development itch by hiding WP Engine's Legacy Staging environments.
date: 2019-05-22
---
I haven't published a plugin to the WordPress plugin repository in a while, since I hurried to push out [Update Privacy](https://wordpress.org/plugins/update-privacy/) (when I found out the data WordPress sends on every update check). Anyway. [WP Engine](https://wpengine.com/) is generally great for WordPress hosting<sup>*</sup> but they have confused things with Legacy Staging.

_Staging_ used to mean you'd get a installname.staging.wpengine.com copy of the Production site that you could copy to and from, accessible from within the WP dashboard. So far so simple. Then they moved to "1 site contains 3 environments", namely Production, Staging and Development. These have different installname.wpengine.com CNAMEs. Which is cool, as that fits even better with our workflow. But those old staging sites can still be created, and now they're called _Legacy Staging_. Each environment can have a legacy staging copy, meaning one website can have _6 versions_ kicking around. Now when people refer to _staging_, which one do they mean? Which one are your clients talking about?

We're solving this at [work](https://www.10degrees.uk) with process and good communications, but I also want to remove the confusion by hiding "Legacy Staging" from within the WordPress dashboard, so everyone's clear that we're talking about the staging _environment_, not a legacy copy.

Hence another WordPress plugin: [Hide WP Engine Legacy Staging](https://wordpress.org/plugins/hide-wp-engine-legacy-staging/). It simply hides the Legacy Staging links form with the WordPress dashboard, which will reduce confusion and hopefully avoid deploying to the wrong staging copy (it has been known...). All the details are on the plugin page. If it helps, or if you get any issues, do let me know.

By the way, [Dominik Schilling's](https://twitter.com/ocean90) [plugin deploy script](https://github.com/ocean90/svn2git-tools/blob/master/automated-wordpress-plugin-deployment/deploy.sh) takes the pain out of using interacting with SVN :)

* We found out this week that their migration / backup restore tool chokes on DB stored procedures. Sometimes it _fails_ but actually says it suceeds, and sometimes the other way round. But either way it won't copy the stored precedure.