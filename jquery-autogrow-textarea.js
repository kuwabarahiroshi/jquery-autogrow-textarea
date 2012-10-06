;(function($, doc) {
    'use strict';

    $.autoGrowTextArea = function(textarea, options) {
        // let's set up plugin wide variables
        var defaults = {
            initialHeight: false
        },
            plugin = this,
            $textarea = $(textarea),
            origin;
        
        plugin.settings = {};
        
        /**
         * Enables the plugin
         */
        plugin.enable = function() {
            $textarea.on({
                'focus.autoGrowTextArea': onTextAreaFocus,
                'blur.autoGrowTextArea': onTextAreaBlur
            });
            
            // match the clone value with the original and run an initial grow
            plugin.$origin.val($textarea.val());
            plugin.grow();
        };
        
        /**
         * Disables the plugin
         */
        plugin.disable = function() {
            $textarea.off('.autoGrowTextArea');
            
            // clear the interval in case it was still running
            clearInterval(plugin.timerId);
        };
        
        /**
         *  (Re)initialize the plugin
         */
        plugin.reinit = function() {
            // set up some variables
            var hasOffset, height, innerHeight;
            
            // initiate our settings, use defaults where necessary
            plugin.settings = $.extend({}, defaults, options);
            
            plugin.offset = 0;
            
            // check if $origin already exists and remove it if so
            if(plugin.$origin) {
                plugin.$origin.remove();
                
                // disable the plugin while reinitializing
                plugin.disable();
            }
            
            $textarea.css({overflow: 'hidden', resize: 'none'});

            plugin.$origin = $textarea.clone().val('').appendTo(doc.body);
            origin = plugin.$origin.get(0);

            height = plugin.$origin.height();
            origin.scrollHeight; // necessary for IE6-8. @see http://bit.ly/LRl3gf
            hasOffset = (origin.scrollHeight !== height);

            // `hasOffset` detects whether `.scrollHeight` includes padding.
            // This behavior differs between browsers.
            if (hasOffset) {
                innerHeight = plugin.$origin.innerHeight();
                plugin.offset = innerHeight - height;
            }
            
            // if initialHeight has been provided in the settings use that value, otherwise use our calculated value
            plugin.initialHeight = plugin.settings.initialHeight ? plugin.settings.initialHeight : height;

            plugin.$origin.hide();
            
            // we are done reinitializing, let's enable the plugin
            plugin.enable();
        };
        
        /**
         * grow textarea height if its value changed
         */
        plugin.grow = function() {
            var current, scrollHeight, height;

            current = $textarea.attr('value');
            if (current === plugin.prev) return;

            plugin.prev = current;

            plugin.$origin.attr('value', current).show();
            origin.scrollHeight; // necessary for IE6-8. @see http://bit.ly/LRl3gf
            scrollHeight = origin.scrollHeight;
            height = scrollHeight - plugin.offset;
            plugin.$origin.hide();

            $textarea.height(height > plugin.initialHeight ? height : plugin.initialHeight);
        };

        /**
         * on focus
         */
        var onTextAreaFocus = function() {
            plugin.prev = $textarea.val();
            plugin.timerId = setInterval(plugin.grow, 30);
        };

        /**
         * on blur
         */
        var onTextAreaBlur = function() {
            clearInterval(plugin.timerId);
        };

        /**
         * destroy the plugin and remove all traces of it
         */
        plugin.destory = function() {
            plugin.disable();
            plugin.$origin.remove();
            
            $textarea.removeData('autoGrowTextArea');
        };
        
        plugin.reinit();
    };

    /**
     * Initialization on each element
     */
    var autoGrowTextArea = function(method, options) {
        return this.each(function() {
            if (undefined == $(this).data('autoGrowTextArea')) {
                // if we haven't created the plugin yet, the method must be the options
                options = method;
                var plugin = new $.autoGrowTextArea(this, options);
                $(this).data('autoGrowTextArea', plugin);
            }
            else if(method != undefined) {
                var autoGrowTextArea = $(this).data('autoGrowTextArea');
                if(autoGrowTextArea.hasOwnProperty(method)) {
                    autoGrowTextArea[method](options);
                }
                else {
                    $.error('autoGrowTextArea has not method: ' + method);
                }
            }
            else {
                $.error('autoGrowTextArea has already been initialized');
            }
        });
    };
    
    // Plugin interface
    $.fn.autoGrowTextarea = autoGrowTextArea;
    $.fn.autoGrowTextArea = autoGrowTextArea;
    
    // Shorthand alias
    if (!('autoGrow' in $.fn)) {
        $.fn.autoGrow = autoGrowTextArea;
    }
}(jQuery, document));