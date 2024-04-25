jQuery(document).ready(function($){


	// Splide autoplay interval
	var slideDuration = 10000; //10sec. might be useful in the future..


	// set splide parameters. see https://splidejs.com/guides/options/ for more options
	var myslider = new Splide( '.splide', {
		type: 'fade',
		rewind: true,
		speed: 1000,
		autoplay: true,
		interval: slideDuration,
		pauseOnHover: false,
		pauseOnFocus: false
	});
	

	// animate text, intro and outro
	function animateText() {

		// get the text to show from data-text attribute
		var text = $('.splide .splide__slide.is-active').data('text');
		
		// must clear the text container first to make have the animation load on every slide switch
		$('.text').empty();
		$('.text').append('<div>' + text + '</div>');
		$('.text div').addClass('text-animation');

		// set movinwords parameters
		var textAnimate = new Movinwords({
			el: '.text-animation',
			autostart: false,
			duration: 500,
			delay: 100,
			transition: 'slideInTop',
		});


		// fire text animation
		textAnimate.start();


		// add class .mw-r as a work around for text outro animation. Fire after 7 sec. it needs to be adjusted based on the splides interval to prevent overlaping the animation of both plugin 
		setTimeout(function(){
			$('.text-animation').addClass('mw-r');
		}, 7000);

	}
		

	// run text animation 2 sec after the first slide is loaded
	myslider.on( 'mounted', function(){

		// set 1 sec timeout to properly see the animation.
		setTimeout(function(){
			animateText();
		}, 1000);

	});


	// mount slider. This must run after the slide event is mounted!!
	myslider.mount();
	

	// splide moved event. fire animation on every slide switching
	myslider.on( 'moved', function(){
		animateText();
	});

});