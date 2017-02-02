(function($, window) {
  var DisplayFunctions = (function() {
    "use strict";

    /**
     * Start up Foundation
     */
    var initFoundation = function() {
      $(document).foundation();

      // MotionUI.animateIn('#main-article', 'fade-in');
    };

    var closeables = function(close, mq) {
      var mediaQuery = window.matchMedia("(" + mq + ")");
      if (mediaQuery.matches) {
        $(close).each(function() {
          if(typeof $(this).data('added') == 'undefined') {
            $(this).data('added', true);
            var self = this;
            $(this).data("button-text", $(this).find('.closeable--button').html());
            var height = $(this).innerHeight();

            $(this).find('.closeable--button').on('click', function() {
              var button = this;
              if (!$(self).hasClass('closeable--open')) {

                if (typeof $(self).attr('data-closeable-height') !== 'undefined') {
                  $(self).animate({height: height}, 300, "swing", function () {
                    $(self).css("height", 'auto');
                    $(button).html('Close <i class="fa fa-close"></i>');
                  });
                } else {
                  $(this).html('Close <i class="fa fa-close"></i>');
                }
              } else {
                if (typeof $(self).attr('data-closeable-height') !== 'undefined') {
                  $(self).animate({height: $(self).attr('data-closeable-height') + 'px'}, 300, "swing", function () {
                    $(self).css("height", $(self).attr('data-closeable-height') + 'px');
                    $(button).html($(self).data('button-text'));
                  });
                } else {
                  $(this).html($(self).data('button-text'));
                }
                $("html,body").animate({
                  scrollTop: $(self).offset().top - 50
                }, 300, function() {});
              }
              $(self).toggleClass('closeable--open');
              $(self).find('.closeable--closed').toggle();
              $(self).find('.closeable--expanded').toggle();
              return false;
            });

            if (typeof $(this).attr('data-closeable-height') !== 'undefined') {
              $(this).css('height', $(this).attr('data-closeable-height') + 'px');
            }
          }
        });
      }
      else {
        $(close).each(function() {
          $(this).css("height", 'auto');
        });
      }
    };

    var maxHeightDropdowns = function() {

    };

    /**
     * Adds and removes classes for the mobile sticky menu.
     * @param stick
     */
    var stickyMobile = function(stick) {
      var scroll, $stickyMobile = $(stick);
      $(document).scroll(function() {
        scroll = $(document).scrollTop();
        if (scroll > 53) {
          $stickyMobile.addClass("fixed");
        }
        else {
          $stickyMobile.removeClass("fixed");
        }
      });
    };


    /**
     * Creates a custom dropdown toggle. Hamburger menu isn't available in Foundation
     * at larger viewports.
     * @param selector
     *  The selector from the item that is clicked for which element to show.
     */
    var createToggle = function(trigger) {
      var $toggle = $(trigger).siblings('ul');
      var height;

      if ($toggle.data("height")) {
        height = $toggle.data("height");
      }
      else {
        height = $toggle.height();
        $toggle.data("height", height);
      }

      trigger.toggleClass("showing-toggle");
      trigger.parents(".xprize-custom-dropdown").toggleClass("showing-toggle");
      $toggle.toggleClass("showing-toggle-nav");

      if ($toggle.hasClass("showing-toggle-nav")) {
        $toggle.height(0);
        $toggle.toggle().animate({height: height}, 500, "swing", function() {
          $toggle.css("height", "auto");
        });
      }
      else {
        $toggle.animate({height: 0}, 500, "swing", function() {
          $toggle.toggle();
          $toggle.css("height", "auto");
        });
      }
    };


    /**
     * Attaches click handler to selector.
     * @param selector
     *  The selector from the item that is clicked for which element to show.
     */
    var customDropdown = function(selector) {
      $(selector).click(function(e) {
        e.preventDefault();
        createToggle($(this));
      });
    };


    /**
     * Custom smooth scroller
     */
    var customSmoothScroll = function(element) {
      $(element).click(function() {
        if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
          if (target.length) {
            $("html,body").animate({
              scrollTop: target.offset().top - 50
            }, 1000);
            $(this).parents("nav").toggleClass("expanded");
            return false;
          }
        }
      });
    };


    /**
     * Binds to the slider buttons.
     * Forces a smooth scroll up if on small device.
     */
    var bindSliderClickMobile = function(element, parents, mq) {
      var $element = $(element);
      $element.click(function() {
        var mediaQuery = window.matchMedia("(" + mq + ")");
        if (mediaQuery.matches) {
          var target = $(this).parents(parents);
          if (target.length) {
            $("html,body").animate({
              scrollTop: target.offset().top - 50
            }, 500);
          }
        }
      });
    };

    var toggleChevron = function(selector){
      var $anchor = $(selector);
      // Making the mobile navigation chevrons go up/down
      $anchor.click(function() {
        $(this).find(".fa").toggleClass("fa-chevron-up").toggleClass("fa-chevron-down");
      });
    };

    /**
     * Binds an input box on input and appends the input to the
     * url parameter.
     * @param input
     *  The input box to bind to.
     * @param submit
     *  The submit button that will be clicked.
     * @param url
     *  The href to send user to after clicking.
     */
    var bindSearchBox = function(input, submit, url) {
      var $input = $(input),
        $submit = $(submit);

      // On edit of search box, change the href value of the search button.
      $input.on("input", function() {
        var inputVal = $(this).val();
        $submit.attr("href", url + inputVal);
      });
    };

    var hamburgerDropdown = function(selector) {
      $(selector).click(function() {
        $('#main-menu').toggle();
        $(this).toggleClass("showing-main-menu");
      });
    };

    /**
     * Initialize the page.
     */
    var init = function() {
      // Init
      initFoundation();
      hamburgerDropdown('.hamburger');
      customDropdown($(".dropdown a.dropdown-toggler"));
      customDropdown($(".footer-top a.dropdown-toggler"));
      customDropdown($(".mobile-footer a.dropdown-toggler"));
      // toggleChevron(".xprize-custom-dropdown a.show-for-small");
      // Needed to do a custom smooth scroll. The magellan nav
      // couldn't have 2 offsets.
      customSmoothScroll("#mobile-links a");

      bindSliderClickMobile(".orbit-slider-buttons a", ".orbit-container-wrapper", "max-width: 40em");
      stickyMobile(".sticky-mobile");
      bindSearchBox("#search-box", "#search-submit", "http://xprize.org/search/node/");
    };

    // Expose for later use.
    return {
      init: init,
      customDropdown: customDropdown,
      customSmoothScroll: customSmoothScroll,
      bindSliderClickMobile: bindSliderClickMobile,
      bindSearchBox: bindSearchBox,
      closeables: closeables
    };
  })();

  // Initialize Foundation's equalizer on non-mobile
  $(window).on("resize", function() {
    "use strict";

    $('.closeable').each(function() {
      DisplayFunctions.closeables(this, "min-width: 0px");
    });
  });

  $(window).load(function() {
    DisplayFunctions.init();

    $('.closeable.closeable--with-images').each(function() {
      var $images = $(this).find('a > img');
      var loaded_img_count = 0;
      var self = this;

      $images.load(function() {
        loaded_img_count++;

        if (loaded_img_count == $images.length) {
          DisplayFunctions.closeables(self, "min-width: 0px");
        }
      });
    });

    $('.closeable:not(.closeable--with-images)').each(function() {
      DisplayFunctions.closeables(this, "min-width: 0px");
    });
  });

}(jQuery, window));

