/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

    });


    //iframe autoheight
    
        $('iframe.iframes').iFrameResize({
            heightCalculationMethod: 'taggedElement'
        });
    

    //fitVids videos
    function video(){
        $('#wrapper').fitVids();
    }
    video();

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };

    //$bower support for iframeAutoHeight plug in
        var matched,
        userAgent = navigator.userAgent || "";

        // Use of jQuery.browser is frowned upon.
        // More details: http://api.jquery.com/jQuery.browser
        // jQuery.uaMatch maintained for back-compat
        jQuery.uaMatch = function( ua ) {
            ua = ua.toLowerCase();

            var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
                /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
                /(opera)(?:.*version)?[ \/]([\w.]+)/.exec( ua ) ||
                /(msie) ([\w.]+)/.exec( ua ) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec( ua ) ||
                [];

            return {
                browser: match[ 1 ] || "",
                version: match[ 2 ] || "0"
            };
        };

        matched = jQuery.uaMatch( userAgent );

        jQuery.browser = {};

        if ( matched.browser ) {
            jQuery.browser[ matched.browser ] = true;
            jQuery.browser.version = matched.version;
        }

        // Deprecated, use jQuery.browser.webkit instead
        // Maintained for back-compat only
        if ( jQuery.browser.webkit ) {
            jQuery.browser.safari = true;
        }


    //move background
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;

    if (!isMobile) {
        $.easing.smoothmove = function (x, t, b, c, d) {return -c *(t/=d)*(t-2) + b;}; 

        $(".mainHeader").mousemove(function(e){

            $(".mainCover").animate({
              'background-position-x': (e.pageX * -1 / 50),
              'background-position-y': (e.pageY * -1 / 50)
            }, {queue:false,duration:200,easing:'smoothmove'});

        });
        $(".mainInfo").delay(500).animate({"opacity": "1"}, 1300);
        $(".menu").delay(700).animate({"opacity": "1"}, 1300);    
    };
    if (isMobile) {
        //menu open and close on mobile
        $document.ready(function () {
            $('#mobileMenu').removeClass("menuHide","menuActivated");
        });
        $('#menuOpen').click(function(){
            if ($('#mobileMenu').hasClass("menuHide")){
                $('#mobileMenu').removeClass("menuHide");
            }
            $('#mobileMenu').addClass("menuActivated");
        });
        $('#menuClose').click(function(){
            $('#mobileMenu').removeClass("menuActivated").addClass("menuHide");
        });
    };


})(jQuery);

