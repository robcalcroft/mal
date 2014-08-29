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
		mal.mailer.submitWatch();
		mal.scrollspy();
		mal.tooltipster();
		mal.scrollToWatch();
		mal.tumblrApi.getPosts();
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
        			} else if(id == 'work' && mal.first) {
        				$('div.tumblr').fadeIn('slow')
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
	},

	tumblrApi: {
		getPosts: function() {
			$.getJSON('https://api.tumblr.com/v2/blog/mpcrc.tumblr.com/posts?api_key=ipNDzJSTo2fIY4act8zFBOiuHEYFLNG6mZ7UvkJ6aFSeftvKwx&callback=?&limit=50', function(data) {
				mal.tumblrApi.renderPosts(data.response.posts)
			})
		},

		renderPosts: function(posts) {
			$.each(posts, function(_, post) {
				if (post.type != 'text') { return true }; // Same as 'continue'
				var date = post.date.split(' ')[0].split('-'),
					title = post.title,
					body = post.body,
					months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					post = 
						"<div class='tumblr-post'>"+
							"<div class='tumblr-post-title'>" + title + "</div>"+
							"<div class='tumblr-post-date'>" + date[2] + " " + months[date[1] - 1] + " " + date[0] + "</div>"+
							"<div class='tumblr-post-body'>" + body + "</div>"+
						"</div>";
				$('.blog-main').append(post)
			})
		}
	},

	mailer: {
		submitWatch:function() {
			$('form#contact-form').submit(function(e) {
				e.preventDefault();
				var name  = $(this).children('#contact-name').val(),
					email = $(this).children('#contact-details').val(),
					body  = $(this).children('#contact-desc').val();
				$.ajax({
					type: 'POST',
					dataType: 'JSON',
					url: 'php/mailer.php',
					data: {
						name: name,
						email: email,
						body: body
					}
				})
				.success(function(result) {
					console.log(result.message)
					if(result.status != 1) {
						$('.contact-error').fadeIn().delay(7500).fadeOut()
					} else {
						$('.contact-success').fadeIn().delay(7500).fadeOut()
					}
				})
				.fail(function() {
					$('.contact-error').fadeIn().delay(7500).fadeOut()
				})
			})
		}
	}

}

$(document).ready(mal.init);