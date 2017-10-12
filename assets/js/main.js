(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$sidebar = $('#sidebar');

			if (skel.vars.IEVersion < 12)
				$body.addClass('is-ie');

			if (skel.canUse('transition'))
				$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

				$('form').placeholder();

				$('form').on('click', '.submit', function(event) {

						event.stopPropagation();
						event.preventDefault();

						$(this).parents('form').submit();

				});

			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

			if ($sidebar.length > 0) {

				var $sidebar_a = $sidebar.find('a');

				$sidebar_a
					.addClass('scrolly')
					.on('click', function() {

						var $this = $(this);

							if ($this.attr('href').charAt(0) != '#')
								return;

							$sidebar_a.removeClass('active');

							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

							if ($section.length < 1)
								return;

							$section.scrollex({
								mode: 'middle',
								top: '-20vh',
								bottom: '-20vh',
								initialize: function() {

										if (skel.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

										$section.removeClass('inactive');

										if ($sidebar_a.filter('.active-locked').length == 0) {

											$sidebar_a.removeClass('active');
											$this.addClass('active');

										}

										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

			}

			$('.scrolly').scrolly({
				speed: 1000,
				offset: function() {

						if (skel.breakpoint('large').active
						&&	!skel.breakpoint('small').active
						&&	$sidebar.length > 0)
							return $sidebar.height();

					return 0;

				}
			});

			$('.spotlights > section')
				.scrollex({
					mode: 'middle',
					top: '-10vh',
					bottom: '-10vh',
					initialize: function() {

							if (skel.canUse('transition'))
								$(this).addClass('inactive');

					},
					enter: function() {

							$(this).removeClass('inactive');

					}
				})
				.each(function() {

					var	$this = $(this),
						$image = $this.find('.image'),
						$img = $image.find('img'),
						x;

						$image.css('background-image', 'url(' + $img.attr('src') + ')');

						if (x = $img.data('position'))
							$image.css('background-position', x);

						$img.hide();

				});

			if (skel.canUse('transition'))
				$('.features')
					.scrollex({
						mode: 'middle',
						top: '-20vh',
						bottom: '-20vh',
						initialize: function() {

								$(this).addClass('inactive');

						},
						enter: function() {

								$(this).removeClass('inactive');

						}
					});

	});

})(jQuery);
