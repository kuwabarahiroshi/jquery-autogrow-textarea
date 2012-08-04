jquery-autogrow-textarea
========================

A jQuery plugin to make textarea be resized automatically to fit its contents.

**DEMO**

http://jsfiddle.net/kuwabarahiroshi/7CsFR/

**Why I wrote this plugin**

Advanced plugin on this feature is found here:  
http://www.technoreply.com/autogrow-textarea-plugin-version-2-0/

However, the plugin is not so good at multibyte character.  
I, as a Japanese, thought it could be enhanced with using `setInterval()` and `.scrollHeight` to detect textarea height.

**Misc**

 * IE6-8 has a bug on `.scrollHeight` as described here:  
   http://www.atalasoft.com/cs/blogs/davidcilley/files/IETextAreaBug.html  
   This plugin copes well with this bug.

 * Padding height of a textarea is included in `.scrollHeight` on IE, Webkit, Opera, but excluded on FireFox.  
   This plugin is perfectly cross-browser compatible.  
   Compatibility is realized with feature detection not with browser detection.

**Tested**

 * Win XP: IE8
 * Win Vista: IE9, Opera, Firefox
 * Mac OSX: Chrome, Firefox, Safari
 * iOS: mobile safari