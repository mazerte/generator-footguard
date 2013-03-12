define ['app/helpers/modernizr_test'], (Modernizr)->

	describe 'Test Modernizr mixin', ()->

		it 'Modernizr is defined', ()->
			expect(Modernizr).not.to.be(undefined)

		it 'addTest fullscreen', ()->
			expect(Modernizr.fullscreen).not.to.be(undefined)