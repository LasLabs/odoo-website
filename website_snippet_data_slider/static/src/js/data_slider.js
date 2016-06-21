/* Copyright 2016 LasLabs Inc.
 * License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
 */

odoo.define('website_snippet_data_slider.data_slider', function(require){
  "use strict";
  
  var core = require('web.core');
  var _t = core._t;
  var animation = require('web_editor.snippets.animation');
  var Model = require('web.Model');
  
  var defaults = {
    lazyLoad: 'ondemand',
    slidesToShow: 10,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: true,
    adaptiveHeight: true,
    variableWidth: true,
    autoplaySpeed: 3000,
    centerMode: true,
    data_model: 'product.template',
    data_domain: [['website_published', '=', true]],
    data_image_field: 'image_medium',
    data_name_field: 'display_name',
    data_title: 'Featured Products',
    data_title_tag: 'h1',
    data_title_class: 'text-center',
    data_uri_prefix: '/shop/product/',
    data_limit: 10,
    //prevArrow: $('<button type="button" class="slick-prev">Prev</button>'),
    //nextArrow: $('<button type="button" class="slick-next">Next</button>'),
    //responsive: [
    //  {
    //    breakpoint: 1024,
    //    settings: {
    //      slidesToShow: 3,
    //      slidesToScroll: 3,
    //      infinite: true,
    //      dots: true
    //    }
    //  },
    //  {
    //    breakpoint: 600,
    //    settings: {
    //      slidesToShow: 2,
    //      slidesToScroll: 2
    //    }
    //  },
    //  {
    //    breakpoint: 480,
    //    settings: {
    //      slidesToShow: 1,
    //      slidesToScroll: 1
    //    }
    //  },
    //  // You can unslick at a given breakpoint now by adding:
    //  // settings: "unslick"
    //  // instead of a settings object
    //],
  };
  
  animation.registry.data_slider = animation.Class.extend({
    selector: ".o_data_slider",
    
    start: function() {
      
      var self = this;
      var $dataNode = $(this.$target.find('rec'));
      var widgetOptions = this.$target.data('options');
      self.$slick = $('<div class="o_slick_container oe_structure"></div>');
      this.$target.html(self.$slick);
      
      if (!widgetOptions) {
        widgetOptions = defaults;
        this.$target.attr('data-options', JSON.stringify(widgetOptions));
      }
      
      self.$slick.slick(widgetOptions);
      
      self.$slick.on('set-option', function(event, key, val) {
        switch (val) {
            case 'true':
              val = true;
              break;
            case 'false':
              val = false;
              break;
            case undefined:
              return;
        }
        if (typeof val === 'object') {
          return;
        }
        self.$slick.slick('slickSetOption', key, val, true);
      });
      
      self.$slick.on('destroy', function(event) {
        self.start();
      });
      
      var model = widgetOptions.data_model;
      var domain = widgetOptions.data_domain;
      var imageField = widgetOptions.data_image_field;
      var dataLimit = widgetOptions.data_limit;
      var nameField = widgetOptions.data_name_field;
      var titleTag = widgetOptions.data_title_tag;
      var titleStr = widgetOptions.data_title;
      var titleClass = widgetOptions.data_title_class;
      var uriPrefix = widgetOptions.data_uri_prefix;
      var baseUri = '/web/image/' + model;
      var fields = [nameField, 'id'];
      this.$target.prepend($('<div class="row"><' + titleTag + ' class="' + titleClass + '">' + titleStr + '</' + titleTag + '></div>' ));
      
      self.get_records_by_domain(model, domain, dataLimit, fields, function(res){
        _.each(JSON.parse(res), function(rec){
          var $img = $('<img></img>');
          var $div = $('<div class="thumbnail"></div>');
          var $href = $('<a href="' + uriPrefix + rec.id + '"></a>');
          var $caption = $('<div class="caption"><h5>' + rec[fields[0]] + '</h5></div>');
          $div.append($href);
          var imgUri = baseUri + '/' + rec.id + '/' + imageField;
          $img.attr('data-lazy', imgUri);
          $href.append($img).append($caption);
          self.$slick.append($div);
          self.$slick.slick('slickAdd', $div);
          self.$slick.slick('slickGoTo', 0);
        });  
      });
      
      return this._super();
    
    },
    
    get_records_by_domain: function(model, domain, limit, fields, callback) {
      // Explicitly encode the data structures to preserve during transfer 
      $.ajax({
        url: '/website/data_slider/' + model,
        method: 'GET',
        data: {
          domain: JSON.stringify(domain),
          fields: JSON.stringify(fields),
          limit: limit,
        },
        success: callback,
      })
    }
    
  });
  
  return {defaults: defaults};
  
});
