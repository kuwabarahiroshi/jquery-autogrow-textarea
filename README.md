jquery-autogrow-textarea
========================

A jQuery plugin to make textarea be resized automatically to fit its contents.

**Usage**

```javascript
$('textarea').autoGrowTextArea();
// or
$('textarea').autoGrowTextarea();
// of, if namespace available
$('textarea').autoGrow();

// Options
$('textarea').autoGrowTextArea({
    minHeight: 50,
    maxHeight: 150
});

// Methods, available after plugin has been initialized
$('textarea').autoGrowTextArea('disable'); // disables autogrowing
$('textarea').autoGrowTextArea('enable'); // (re)enables autogrowing after disabling
$('textarea').autoGrowTextArea('grow'); // triggers the resizing of textarea manually, useful if content has been edited via jquery or while textarea is disabled
$('textarea').autoGrowTextArea('reinit'); // reinitialize plugin, useful if textarea has changed in some way, takes an optional options object as secondary parameter
$('textarea').autoGrowTextArea('destroy'); // reinstates textarea to state before plugin has been first initialized, removes all data and events
```

**DEMO**

http://htmlpreview.github.com/?https://github.com/ximi/jquery-autogrow-textarea/blob/master/index.html

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

 * Win Vista: IE7
 * Win 7: IE9, IE8, Chrome(22.0), Firefox(15.0.1), Safari(5.1.7), Opera(12.02)
 * Mac OSX: Chrome(22.0), Firefox(15.0.1), Safari(6.0.1), Opera(12.02)
 * iOS: Mobile Safari(iOS 6)
 * Android: Stock Browser(Android 2.3)
 * webOS: Stock Browser(webOS 2.2.4)