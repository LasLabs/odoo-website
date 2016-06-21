/* Copyright 2016 LasLabs Inc.
 * License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
 */

odoo.define('website_snippet_data_slider.snippet_editor', function(require){
  "use strict";
  
  var options = require('web_editor.snippets.options');
  var core = require('web.core');
  var _t = core._t;
  
  options.registry.data_slider = options.Class.extend({
    
    defaults: require('website_snippet_data_slider.data_slider').defaults,
    
    start: function() {
      
      var self = this;
      this.do_options();
      
      this.$overlay.find(".oe_handle:not(.size), .oe_handle.size .size")
        .on('mouseup', function (event){
          var size = self.set_size();
          event.preventDefault();
        });
      
      this.$overlay.find(".oe_handle.size .auto_size")
        .on('click', function (event){
          self.set_size();
        });
      
      return this._super();
    
    },
    
    set_size: function() {
      var size = this.get_size();
      var $slickEl = this.$target.find('.o_slick_container');
      this.$target.height(size.height)
      $slickEl.css({
          'position' : 'relative',
          //'left': ((size.width - $slickEl.width()) / 2),
          'top': ((size.height - $slickEl.height()) / 2),
        });
    },
    
    get_size: function() {
      var $handles = this.$overlay.find('.oe_handles');
      var $n = $handles.find('.n')
      var $s = $handles.find('.s');
      var $e = $handles.find('.e');
      var $w = $handles.find('.w');
      return {
        width: $n.width(),
        height: $e.height(),
        $n: $n,
        $s: $s,
        $e: $e,
        $w: $w,
      }
    },
    
    settings_callback: function(event, data){
      
      data = JSON.parse(data);
      console.log(event);
      
      switch (event) {
        case 'over':
          this.optionsBackup = this.options;
          this.do_options(data, event);
          break;
        
        case 'reset':
          this.reset_options(this.optionsBackup);
          break;
        
        case 'click':
          this.do_options(data, event);
          break;
          
      }
    },
    
    do_options: function(addData, eventName) {
      var self = this;
      var destroy = false;
      
      try {
        // .data giving unpredictable results
        var originalOptions = this.$target.attr('data-options');
        originalOptions = JSON.parse(originalOptions);
      } catch(e) {
        var originalOptions = {};
      }
      this.options = _.defaults(originalOptions, this.defaults);
      if (addData) {
        this.options = _.defaults(addData, this.options);
        _.each(addData, function(val, key){
          if (val != originalOptions[key]) {
            if (key.startsWith('data_')) {
              if (eventName == 'click') {
                var deferredUserData= $.Deferred();
                var userData = prompt('Enter value for ' + key, self.options[key]);
                if (!userData) {
                    return;
                }
                if (key == 'data_domain') {
                    userData = JSON.parse(userData);
                }
                self.options[key] = userData;
                destroy = true;
              }
            }else{
              $(self.$target.find('.o_slick_container'))
                .trigger('set-option', [key, val]);
            }
          }
        });
      }
      if (this.options != options) {
        console.log('Saving to el data');
        console.log(this.options);
        this.optionsBackup = this.options;
        this.$target.attr('data-options', JSON.stringify(this.options));
        //if (destroy) {
        //  debugger;
        //  $(self.$target.find('.o_slick_container')).trigger('destroy');
        //}
      }
      
    },
    
    reset_options: function(resetData) {
      this.$target.attr('data-options', "{}");
      this.do_options(resetData);
    },

  })
  
});
