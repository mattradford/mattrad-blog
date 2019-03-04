---
title: 'Notes from #responsiveconf – Ethan Marcotte'
date: 2014-06-28
permalink: "{{title | slug}}/index.html"
layout: layouts/post.njk
---
### Laziness in the Time of Responsive Design

&#8220;A network of control rearranged at any screen size to best convey a message&#8221; ([Trent Walton][1])

Mobile, tablet and desktops are one continuum of the web.  
We have different device classes and OS.

&#8220;Tablet&#8221; and &#8220;mobile&#8221; are anti-patterns: too broad to define.

60% of mobile access is sub-3G.

&#8220;Anxiety does not come from thinking about the future, but from wanting to control it&#8221; ([Khalil Gibran][2]).

Embrace laziness.

#### Layout

##### Video

Size at smallest viewport. Add a surrounding div with padding-top set at the aspect ratio. Then absolutely position the video in the container.

&#8220;A little less code, a little bit lazier&#8221;.

##### Grids

Target / content = result.

Use `.doc-cell:nth-child(3n)` and `.doc-cell:nth-child(3n+1) { clear: left; }`.

_Matt: Crap. I only just recognised where [ClearLeft][3] got their name!_

#### Frameworks

Good for prototyping.  
Philosophically heavy.

[Content-out layout][4].  
Small layout systems, such as navigation.  
Media queries based on the small systems.

Hamburger problem.

Are off-canvas menus hiding all the things we didn&#8217;t want to deal with?

[Filament][5] shows a menu expanded on the home page, but toggled on interior pages.

[Frank Chimero][6]. Using Flexbox to changes columns of the simple menu.

**Conservation of Effort**.

#### Animation

Design the transaction not the interface.  
Animations for state change. Hiding using `transform: scale(0)`.

&#8220;Websites should be built to face the reality of the web&#8217;s inherent variabilty&#8221; (Trent Walton).  
[Device-Agnostic article][7].

Progressive enhancement = letting go of designing for specific devices.

The web is any size, any time.

[Beginner&#8217;s mind][8].

 [1]: http://trentwalton.com/
 [2]: http://en.wikipedia.org/wiki/Kahlil_Gibran
 [3]: http://clearleft.com/
 [4]: http://alistapart.com/article/content-out-layout
 [5]: http://filamentgroup.com/
 [6]: http://frankchimero.com/
 [7]: http://trentwalton.com/2014/03/10/device-agnostic/
 [8]: http://en.wikipedia.org/wiki/Shoshin