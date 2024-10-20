(function ($) {
    "use strict";

    $(window).on("load", function () {
        $(".preloader").fadeOut();
        isotopeintial();
        $(".slick-slider").slick("refresh");
    });

    if ($(".preloader").length > 0) {
        $(".preloaderCls").each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                $(".preloader").css("display", "none");
            });
        });
    }

    function onePageNav(element) {
        if ($(element).length > 0) {
            $(element).each(function () {
                $(this)
                    .find("a")
                    .each(function () {
                        $(this).on("click", function () {
                            var target = $(this.getAttribute("href"));
                            if (target.length) {
                                event.preventDefault();
                                $("html, body")
                                    .stop()
                                    .animate(
                                        {
                                            scrollTop: target.offset().top - 10,
                                        },
                                        1000
                                    );
                            }
                        });
                    });
            });
        }
    }
    onePageNav(".onepage-nav");

    $(".mobile-menu-active").vsmobilemenu({
        menuContainer: ".th-mobile-menu",
        expandScreenWidth: 992,
        menuToggleBtn: ".th-menu-toggle",
    });

    /*---------- 04. Sticky fix ----------*/
   $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        if (topPos > 500) {
            $('.th-header').addClass('sticky');
        } else {
            $('.th-header').removeClass('sticky')
        }
    })

    /*---------- 05. Scroll To Top ----------*/
    // progressAvtivation
    if($('.scroll-top')) {
        
        var scrollTopbtn = document.querySelector('.scroll-top');
        var progressPath = document.querySelector('.scroll-top path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);	
        var offset = 50;
        var duration = 750;
        jQuery(window).on('scroll', function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(scrollTopbtn).addClass('show');
            } else {
                jQuery(scrollTopbtn).removeClass('show');
            }
        });				
        jQuery(scrollTopbtn).on('click', function(event) {
            event.preventDefault();
            jQuery('html, body').animate({scrollTop: 0}, duration);
            return false;
        })
    }

    if ($(".background-image").length > 0) {
        $(".background-image").each(function () {
            var src = $(this).attr("data-th-img");
            $(this).css({
                "background-image": "url(" + src + ")",
            });
        });
    }

    function isotopeintial() {
        // Isotope initialization
        var $isotope = $(".filter-active").isotope({
            filter: "*",
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: false,
            },
            layoutMode: 'fitRows',

        });

        // Isotope filter
        $(".filter-menu").on("click", "button", function () {
            var $this = $(this);
            $(".filter-menu").find("button").removeClass("active");
            $this.addClass("active");
            var selector = $this.attr("data-filter");
            $isotope.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: false,
                },
            });
            return false;
        });
    }

    $(".th-carousel").each(function () {
        var asSlide = $(this);

        // Collect Data
        function d(data) {
            return asSlide.data(data);
        }

        // Custom Arrow Button
        var prevButton =
                '<button type="button" class="slick-prev"><i class="' +
                d("prev-arrow") +
                '"></i></button>',
            nextButton =
                '<button type="button" class="slick-next"><i class="' +
                d("next-arrow") +
                '"></i></button>';

        // Function For Custom Arrow Btn
        $("[data-slick-next]").each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                $($(this).data("slick-next")).slick("slickNext");
            });
        });

        $("[data-slick-prev]").each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                $($(this).data("slick-prev")).slick("slickPrev");
            });
        });

        // Check for arrow wrapper
        if (d("arrows") == true) {
            if (!asSlide.closest(".arrow-wrap").length) {
                asSlide.closest(".container").parent().addClass("arrow-wrap");
            }
        }

        asSlide.slick({
            dots: d("dots") ? true : false,
            fade: d("fade") ? true : false,
            arrows: d("arrows") ? true : false,
            speed: d("speed") ? d("speed") : 1000,
            asNavFor: d("asnavfor") ? d("asnavfor") : false,
            autoplay: d("autoplay") == false ? false : true,
            infinite: d("infinite") == false ? false : true,
            slidesToShow: d("slide-show") ? d("slide-show") : 1,
            adaptiveHeight: d("adaptive-height") ? true : false,
            centerMode: d("center-mode") ? true : false,
            autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 8000,
            centerPadding: d("center-padding") ? d("center-padding") : "0",
            focusOnSelect: d("focuson-select") == false ? false : true,
            pauseOnFocus: d("pauseon-focus") ? true : false,
            pauseOnHover: d("pauseon-hover") ? true : false,
            variableWidth: d("variable-width") ? true : false,
            vertical: d("vertical") ? true : false,
            verticalSwiping: d("vertical") ? true : false,
            prevArrow: d("prev-arrow")
                ? prevButton
                : '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
            nextArrow: d("next-arrow")
                ? nextButton
                : '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
            rtl: $("html").attr("dir") == "rtl" ? true : false,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        arrows: d("xl-arrows") ? true : false,
                        dots: d("xl-dots") ? true : false,
                        slidesToShow: d("xl-slide-show")
                            ? d("xl-slide-show")
                            : d("slide-show"),
                        centerMode: d("xl-center-mode") ? true : false,
                        centerPadding: "0",
                    },
                },
                {
                    breakpoint: 1400,
                    settings: {
                        arrows: d("ml-arrows") ? true : false,
                        dots: d("ml-dots") ? true : false,
                        slidesToShow: d("ml-slide-show")
                            ? d("ml-slide-show")
                            : d("slide-show"),
                        centerMode: d("ml-center-mode") ? true : false,
                        centerPadding: 0,
                    },
                },
                {
                    breakpoint: 1200,
                    settings: {
                        arrows: d("lg-arrows") ? true : false,
                        dots: d("lg-dots") ? true : false,
                        slidesToShow: d("lg-slide-show")
                            ? d("lg-slide-show")
                            : d("slide-show"),
                        centerMode: d("lg-center-mode")
                            ? d("lg-center-mode")
                            : false,
                        centerPadding: 0,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        arrows: d("md-arrows") ? true : false,
                        dots: d("md-dots") ? true : false,
                        slidesToShow: d("md-slide-show")
                            ? d("md-slide-show")
                            : 1,
                        centerMode: d("md-center-mode")
                            ? d("md-center-mode")
                            : false,
                        centerPadding: 0,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        arrows: d("sm-arrows") ? true : false,
                        dots: d("sm-dots") ? true : false,
                        slidesToShow: d("sm-slide-show")
                            ? d("sm-slide-show")
                            : 1,
                        centerMode: d("sm-center-mode")
                            ? d("sm-center-mode")
                            : false,
                        centerPadding: 0,
                    },
                },
                {
                    breakpoint: 576,
                    settings: {
                        arrows: d("xs-arrows") ? true : false,
                        dots: d("xs-dots") ? true : false,
                        slidesToShow: d("xs-slide-show")
                            ? d("xs-slide-show")
                            : 1,
                        centerMode: d("xs-center-mode")
                            ? d("xs-center-mode")
                            : false,
                        centerPadding: 0,
                    },
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ],
        });
    });

    /*---------- 17. AS Tab ----------*/
    $.fn.asTab = function (options) {
        var opt = $.extend(
            {
                sliderTab: false,
                tabButton: "button",
            },
            options
        );

        $(this).each(function () {
            var $menu = $(this);
            var $button = $menu.find(opt.tabButton);

            // Append indicator
            $menu.append('<span class="indicator"></span>');
            var $line = $menu.find(".indicator");

            // On Click Button Class Remove and indecator postion set
            $button.on("click", function (e) {
                e.preventDefault();
                var cBtn = $(this);
                cBtn.addClass("active").siblings().removeClass("active");
                if (opt.sliderTab) {
                    $(slider).slick("slickGoTo", cBtn.data("slide-go-to"));
                } else {
                    linePos();
                }
            });

            // Work With slider
            if (opt.sliderTab) {
                var slider = $menu.data("asnavfor"); // select slider

                // Select All button and set attribute
                var i = 0;
                $button.each(function () {
                    var slideBtn = $(this);
                    slideBtn.attr("data-slide-go-to", i);
                    i++;

                    // Active Slide On load > Actived Button
                    if (slideBtn.hasClass("active")) {
                        $(slider).slick(
                            "slickGoTo",
                            slideBtn.data("slide-go-to")
                        );
                    }

                    // Change Indicator On slide Change
                    $(slider).on(
                        "beforeChange",
                        function (event, slick, currentSlide, nextSlide) {
                            $menu
                                .find(
                                    opt.tabButton +
                                        '[data-slide-go-to="' +
                                        nextSlide +
                                        '"]'
                                )
                                .addClass("active")
                                .siblings()
                                .removeClass("active");
                            linePos();
                        }
                    );
                });
            }

            // Indicator Position
            function linePos() {
                var $btnActive = $menu.find(opt.tabButton + ".active"),
                    $height = $btnActive.css("height"),
                    $width = $btnActive.css("width"),
                    $top = $btnActive.position().top + "px",
                    $left = $btnActive.position().left + "px";

                $line.get(0).style.setProperty("--height-set", $height);
                $line.get(0).style.setProperty("--width-set", $width);
                $line.get(0).style.setProperty("--pos-y", $top);
                $line.get(0).style.setProperty("--pos-x", $left);

                if (
                    $($button).first().position().left ==
                    $btnActive.position().left
                ) {
                    $line
                        .addClass("start")
                        .removeClass("center")
                        .removeClass("end");
                } else if (
                    $($button).last().position().left ==
                    $btnActive.position().left
                ) {
                    $line
                        .addClass("end")
                        .removeClass("center")
                        .removeClass("start");
                } else {
                    $line
                        .addClass("center")
                        .removeClass("start")
                        .removeClass("end");
                }
            }
            linePos();
        });
    };

    // Call On Load
    if ($(".responsive-tab").length) {
        $(".responsive-tab").asTab({
            sliderTab: true,
            tabButton: ".tab-btn",
        });
    }


    /*----------- 19. Button Style ----------*/
    $(".th-btn.style-border").each(function(){
        var buttonText = $(this).text();
        $(this).empty();
        $(this).append('<span class="top-line"></span>');
        $(this).append('<span class="text">' + buttonText + '</span>');
        $(this).append('<span class="bottom-line-1"></span>');
        $(this).append('<span class="bottom-line-2"></span>');
    });

    /*============================================*/
    /*----------- 20. Gsap Animation ----------*/
    /*============================================*/

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TweenMax, ScrollToPlugin);

    gsap.config({
        nullTargetWarn: false,
    });

    let smoother = ScrollSmoother.create({
        smooth: 1.35,
        effects: true,
        smoothTouch: false,
        normalizeScroll: false,
        ignoreMobileResize: true,
    });

    
    $(document).ready(function() {

        // updateSmoothWrapperPadding
        function updateSmoothWrapperPadding() {
            var headerHeight = $('.th-header').outerHeight();
            $('#smooth-wrapper').css('padding-top', headerHeight + 'px');
        }

        function refreshPaddingBasedOnSticky() {
            var isSticky = $('.th-header').hasClass('sticky');
            if (isSticky) {
                $('#smooth-wrapper').css('padding-top', '0');
            } else {
                updateSmoothWrapperPadding();
            }
        }
        refreshPaddingBasedOnSticky();
        $(window).resize(function() {
            refreshPaddingBasedOnSticky();
        });
        
        if (typeof MutationObserver !== 'undefined') {
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        refreshPaddingBasedOnSticky();
                    }
                });
            });
            observer.observe(document.querySelector('.th-header'), { attributes: true });
        }
        
        // Cursor smoothness
        $(document).mousemove(function(event) {
            var mouseX = event.pageX;
            var mouseY = event.pageY;
            $('.custom-element').animate({ left: mouseX, top: mouseY }, 300);
        });
    });
       
    

    // 25. Title Animation
    let splitTitleLines = gsap.utils.toArray(".title-ani");

    splitTitleLines.forEach(splitTextLine => {
        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: splitTextLine,
            start: 'top 90%',
            end: 'bottom 60%',
            scrub: false,
            markers: false,
            toggleActions: 'play none none none'
            }
        });

        const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
        gsap.set(splitTextLine, { perspective: 500 });
        itemSplitted.split({ type: "lines" })
        tl.from(itemSplitted.lines, { duration: 1.2, delay: 0.3, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
    });

    let splitTextLines = gsap.utils.toArray(".text-ani");

    splitTextLines.forEach(splitTextLine => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: splitTextLine,
                start: 'top 90%',
                duration: 2,
                end: 'bottom 60%',
                scrub: false,
                markers: false,
                toggleActions: 'play none none none'
            }
        });

        const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
        gsap.set(splitTextLine, { perspective: 400 });
        itemSplitted.split({ type: "lines" })
        tl.from(itemSplitted.lines, { duration: 1, delay: 0.5, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
    });

    // Home page Hero Animation 
    function animateHeroTitles(selector) {
        let elements = document.querySelectorAll(selector);
    
        if (!elements || elements.length === 0) {
            console.error(`No elements found for selector: ${selector}`);
            return; // Return if no elements are found
        }

        elements.forEach((element) => {
            let timeline = gsap.timeline();
    
            let splitText = new SplitText(element, { type: "words,chars" });
            timeline.from(splitText.chars, {
                duration: 0.6,
                x: 70,
                autoAlpha: 0,
                stagger: 0.08,
            });
            ScrollTrigger.create({
                animation: timeline,
                trigger: element,
                start: 'top 90%',
                end: 'bottom 60%',
                scrub: false,
                markers: false,
                toggleActions: 'play none none none',
            });
        });
    }
    
    if ($(".title-ani2").length > 0) {
        animateHeroTitles('.title-ani2');
    }


    window.addEventListener('contextmenu', function (e) {
      // do something here...
      e.preventDefault();
    }, false);

    document.onkeydown = function (e) {
      if (event.keyCode == 123) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
      }
    }
    
})(jQuery);
