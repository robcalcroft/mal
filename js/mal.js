var mal = {

	first : true,

	init : function() {
		function winHeightChange() { $('#home, #about, #work, #contact').css('minHeight', $(window).height()) }; winHeightChange();
		$(window).resize(function() {
			winHeightChange();
			mal.scrollspy();
		});
		$('div.main-title').animate({top: '50%', opacity: 1}, {duration:500})
		if($(document).scrollTop() == 0) { $('.nav-home').addClass('nav-on') }
		mal.scrollspy();
		mal.tooltipster();
		mal.scrollToWatch();
		$('img').each(function() {this.draggable = false}) // stop people dragging images

	},

	scrollspy : function() {
		$(window).unbind('scroll') // remove previous scroll
		$('#home, #about, #work, #contact').each(function(i) {
			var position = $(this).position(), id = this.id;
        	$(this).scrollspy({
        		min: position.top,
        		max: position.top + $(this).height(),
        		onEnter: function() {
        			$('.nav-' + id).addClass('nav-on');
        			if(id == 'about' && mal.first) {
        				$('div.about-main').fadeIn('slow');
        			}
        		},
        		onLeave: function() {
        			$('.nav-' + id).removeClass('nav-on');
        		}
        	});
		})
	},

	tooltipster : function() {
		$('.nav-home, .nav-about, .nav-work, .nav-contact').each(function(_) {
			$(this).tooltipster({
				animation: 'fade',
				speed: '150',
				position: 'right',
			})
		})
	},

	scrollTo_ : function(id) {

		$('html, body').animate({

			scrollTop: $('#'+id).offset().top

		}, 800);

	},

	scrollToWatch : function() {
		$('.nav-home, .nav-about, .nav-work, .nav-contact').click(function() {
			mal.scrollTo_(this.className.split('-')[1].split(' ')[0]) // Wowee efforrtt!
		})
		$('div.arrow-down').click(function() {
			mal.scrollTo_('about')
		})
	}

}

$(document).ready(mal.init);