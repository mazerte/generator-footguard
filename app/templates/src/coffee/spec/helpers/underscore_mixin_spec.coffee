define ['app/helpers/underscore_mixin'], (_)->

	describe 'Test Underscore mixin', ()->
		
		it 'Underscore is defined', ()->
			expect(_).not.to.be(undefined)

		it 'isUsable mixin', ()->
			expect(_.isUsable).to.be.a('function')

		it 'usable mixin', ()->
			expect(_.usable).to.be.a('function')