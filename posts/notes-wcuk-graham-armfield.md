---
title: 'Notes from #wcuk – Graham Armfield'
date: 2014-07-12
permalink: "{{title | slug}}/index.html"
layout: layouts/post.njk
---
### &#8220;A Beginners Guide to Web Accessibility&#8221;

### What legislation do we need to be aware of?

(cf. Norwegian law as of July 1st &#8211; all sites must be accessible)

But which standards?

  * WCAG v2 &#8211; W3C published.
  * A (mandatory), AA (most pragmatic), AAA (impossible!)

AA is most pragmatic

### Most important thing to make a site accessible?

&#8220;Enabling the web so that everyone can access its content when they want to and how they need to&#8221;

Accessibility is not black and white &#8211; can be fine for some but totally inaccessible for others

Accessibility can increase profitability.

### More people are affected by poor accessibility that you think.

12m in UK have a recognised disability. 15m > 55 old.

So (roughly) 16.5m could benefit from good acc.

Not all about blind people. Blindness is a legal term, some registered blind can see things  
1/12 have colour blindness.

2.6m people have difficulty using their hands.

_Ida Aalen_: websites must be navigable by keyboard, touch & mouse.

2m people have a hearing impairment.  
2m people are dyslexic.  
2.2m have memory difficulties.

Can&#8217;t make assumptions about who is visiting your site, e.g. a blind parent browsing for a skateboard for a child.  
Impacts on your business; reputation.

People with disabilities represent a market worth £80bn in UK.  
83% of PWD will not return to a business that meerts their needs.

### Law

Equality Act 2010 (supplemanted DDA, except in NI). Specifically refers to websites, but does not define reasonable steps.

#### &#8220;No-one gets sued anyway&#8221;.

BMI sued in 2012 by RNIB as you couldn&#8217;t book a seat without a mouse.

#### Types of disability/impairment

Visual, Motor, Deafness & Hard of Hearing, Epilepsy, Cognitive (dyslexia, autism, ADHD).

### Mitigating impairment

Lots of people with accessibility needs use IE because it has good accessibility built in, same with Firefox. Not Chrome.

<span style="line-height: 1.428571429;">IE, FF users can specify colours</span>  
Adjust text size without zooming

Absolute pixel values cannot be adjusted in IE.

&nbsp;

#### Assistive technology

Glasses  
Zooming in  
JAWS screenreader  
Dragon voice recognition

&#8211; voice recognition built into OS X, iOS

Refreshable braille display &#8211; Wow  
Motor switches controlled by feet, shoulders, etc

JAWS costs $895!  
Braille display &#8211; $4k!!!  
Open source srceenreader &#8211; NVDA

&#8211; Also VoiceOver in iOS and OS X &#8211; plug and play with braille displays  
&#8211; https://www.apple.com/uk/accessibility/osx/voiceover/  
&#8211; https://www.apple.com/uk/accessibility/ios/voiceover/

iOS is the tool of choice for Blind people.

Android version of VoiceOver is called TalkBack, but its not as good.

### WordPress accessibility is influeced by:

&nbsp;

  * Theme devs
  * Plugin devs
  * Content authors

75% websites have some sort of accessibility issue.

**Every accessibility step you take will make life easier for someone**

### Simple things to do:

  * alt text images
  * descrbe what image shows or represents
  * if a link, describe destination
  * if decorative, leave blank (use alt=&#8221;&#8221;) &#8211; screen readers know to ignore
  * WP will put a blank alt tag in if content picker is used.

#### Links

Use &#8220;my blog post: read more&#8221; not my blog post: &#8220;read more&#8221;  
&#8211; means links in screen reader will be appropriate, not just a bunch of &#8220;read more&#8221;s.

#### Use headings properly

&#8211; semantics  
&#8211; used as a nav mechanism by screen readers &#8211; signpost content  
&#8211; HTML5 H1s?  
&#8211; &#8211; screenreaders cannot cope with this

#### Keyboard focus and operation.

&#8211; focus should be easily visible  
&#8211; .hover & .focus together?  
&#8211; tab order should make sense (less of an issue with WP sites)  
&#8211; ensure all functionality accessible by keystrokes  
&#8211; test your own website using tab, arrow and spacebar

#### Text

&#8211; contrast  
&#8211; allow resizing without breaking the layout  
&#8211; don&#8217;t use fully justified text &#8211; makes it a lot harder to read, esp. for thos with dyslexia and congnotive impairments  
&#8211; Dyslexic-appropriate fonts?

#### Forms

&#8211; use labels for input fields, link id to input field  
&#8211; important for screenreaders: if no label, they will get confused  
&#8211; &#8211; how does Gravity Forms cope with this?  
&#8211; don&#8217;t use captchas  
&#8211; generate appropriate errors

#### WAI-ARIA

&#8211; labelling areas with roles

**It&#8217;s hard to retrofit accessibility.**