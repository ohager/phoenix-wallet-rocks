// JavaScript Document


	// $(window).on('load', function() {
	//
	// 	"use strict";
	//
	// 	/*----------------------------------------------------*/
	// 	/*	Preloader
	// 	/*----------------------------------------------------*/
	//
	// 	$("#loader").delay(100).fadeOut();
	// 	$("#loader-wrapper").delay(100).fadeOut("fast");
	//
	// 	$(window).stellar({});
	//
	// });


	$(window).on('scroll', function() {

		"use strict";

		/*----------------------------------------------------*/
		/*	Navigtion Menu Scroll
		/*----------------------------------------------------*/

		var b = $(window).scrollTop();

		if( b > 72 ){
			$(".navbar").addClass("scroll");
		} else {
			$(".navbar").removeClass("scroll");
		}

	});


	$(document).ready(function() {

		"use strict";


		/*----------------------------------------------------*/
		/*	Mobile Menu Toggle
		/*----------------------------------------------------*/

		if ( $(window).width() < 769 ) {
			$('.navbar-nav li.nav-item.nl-simple').on('click', function() {
				$('#navbarSupportedContent').css("height", "1px").removeClass("in").addClass("collapse");
				$('#navbarSupportedContent').removeClass("show");
			});
		}


		/*----------------------------------------------------*/
		/*	Animated Scroll To Anchor
		/*----------------------------------------------------*/

		$('.header a[href^="#"], .page a.btn[href^="#"], .page a.internal-link[href^="#"], .page p a.internal-link[href^="#"]').on('click', function (e) {

			e.preventDefault();

			var target = this.hash,
				$target = jQuery(target);

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top - 110 // - 200px (nav-height)
			}, 'slow', 'easeInSine', function () {
				window.location.hash = '1' + target;
			});

		});


		/*----------------------------------------------------*/
		/*	ScrollUp
		/*----------------------------------------------------*/

		$.scrollUp = function (options) {

			// Defaults
			var defaults = {
				scrollName: 'scrollUp', // Element ID
				topDistance: 600, // Distance from top before showing element (px)
				topSpeed: 800, // Speed back to top (ms)
				animation: 'fade', // Fade, slide, none
				animationInSpeed: 200, // Animation in speed (ms)
				animationOutSpeed: 200, // Animation out speed (ms)
				scrollText: '', // Text for element
				scrollImg: false, // Set true to use image
				activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
			};

			var o = $.extend({}, defaults, options),
				scrollId = '#' + o.scrollName;

			// Create element
			$('<a/>', {
				id: o.scrollName,
				href: '#top',
				title: o.scrollText
			}).appendTo('body');

			// If not using an image display text
			if (!o.scrollImg) {
				$(scrollId).text(o.scrollText);
			}

			// Minium CSS to make the magic happen
			$(scrollId).css({'display':'none','position': 'fixed','z-index': '2147483647'});

			// Active point overlay
			if (o.activeOverlay) {
				$("body").append("<div id='"+ o.scrollName +"-active'></div>");
				$(scrollId+"-active").css({ 'position': 'absolute', 'top': o.topDistance+'px', 'width': '100%', 'border-top': '1px dotted '+o.activeOverlay, 'z-index': '2147483647' });
			}

			// Scroll function
			$(window).on('scroll', function(){
				switch (o.animation) {
					case "fade":
						$( ($(window).scrollTop() > o.topDistance) ? $(scrollId).fadeIn(o.animationInSpeed) : $(scrollId).fadeOut(o.animationOutSpeed) );
						break;
					case "slide":
						$( ($(window).scrollTop() > o.topDistance) ? $(scrollId).slideDown(o.animationInSpeed) : $(scrollId).slideUp(o.animationOutSpeed) );
						break;
					default:
						$( ($(window).scrollTop() > o.topDistance) ? $(scrollId).show(0) : $(scrollId).hide(0) );
				}
			});

			// To the top
			$(scrollId).on('click', function(event){
				$('html, body').animate({scrollTop:0}, o.topSpeed);
				event.preventDefault();
			});

		};

		$.scrollUp();


		/*----------------------------------------------------*/
		/*	Video Link #1 Lightbox
		/*----------------------------------------------------*/

		$('.video-popup1').magnificPopup({
		    type: 'iframe',

				iframe: {
					patterns: {
						youtube: {

							index: 'youtube.com',
							src: 'https://www.youtube.com/embed/SZEflIVnhH8'

								}
							}
						}
		});


		/*----------------------------------------------------*/
		/*	Video Link #2 Lightbox
		/*----------------------------------------------------*/

		$('.video-popup2').magnificPopup({
		    type: 'iframe',

				iframe: {
					patterns: {
						youtube: {

							index: 'youtube.com',
							src: 'https://www.youtube.com/embed/7e90gBu4pas'

								}
							}
						}
		});


		/*----------------------------------------------------*/
		/*	Screens Carousel Slick
		/*----------------------------------------------------*/

		$('.screens-carousel').slick({
			infinite: true,
			autoplay: true,
			centerMode: true,
			dots: true,
			autoplaySpeed: 3500,
			speed: 1000,
			slidesToShow: 5,
			slidesToScroll: 1,
			variableWidth: true,
			responsive: [
			    {
			      breakpoint: 769,
			      settings: {
			        slidesToShow: 3
			      }
			    },
			    {
			      breakpoint: 480,
			      settings: {
				    dots: false,
			        slidesToShow: 1,
			        variableWidth: false,
			        fade: true,
					cssEase: 'linear'
			      }
			    }
			]
		});


		/*----------------------------------------------------*/
		/*	Testimonials Rotator Slick Carousel
		/*----------------------------------------------------*/

		$('#reviews-1 .center').slick({
			centerMode: true,
			autoplay: true,
			centerPadding: '0px',
			speed: 800,
			slidesToShow: 3,
			dots: true,
			responsive: [
				{
					breakpoint: 1199,
					settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '0px',
					slidesToShow: 3
					}
				},
				{
					breakpoint: 991,
					settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '0px',
					slidesToShow: 3
					}
				},
				{
					breakpoint: 800,
					settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '0px',
					slidesToShow: 1
					}
				},
				{
					breakpoint: 767,
					settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '0px',
					slidesToShow: 1
					}
				},
				{
					breakpoint: 648,
					settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '0px',
					slidesToShow: 1
					}
				}
			]
		});



		/*----------------------------------------------------*/
		/*	Statistic Counter
		/*----------------------------------------------------*/

		$('.count-element').each(function () {
			$(this).appear(function() {
				$(this).prop('Counter',0).animate({
					Counter: $(this).text()
				}, {
					duration: 4000,
					easing: 'swing',
					step: function (now) {
						$(this).text(Math.ceil(now));
					}
				});
			},{accX: 0, accY: 0});
		});

	});
