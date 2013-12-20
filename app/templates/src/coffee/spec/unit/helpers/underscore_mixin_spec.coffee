define ['app/helpers/underscore_mixin'], (_)->

	describe 'Test Underscore mixin', ()->
		
		it 'Underscore is defined', ()->
			expect(_).not.to.be.undefined

		it 'isUsable mixin', ()->
			expect(_.isUsable).to.be.a('function')

			_.isUsable(null).should.be.false
			_.isUsable(undefined).should.be.false
			_.isUsable("").should.be.false
			_.isUsable({}).should.be.true
			_.isUsable("titi").should.be.true

		it 'usable mixin', ()->
			expect(_.usable).to.be.a('function')

			_.usable(null, 'default').should.be.equal 'default'
			expect(_.usable(null, null)).to.be.null
			expect(_.usable(null, undefined)).to.be.null
			expect(_.usable(null, "")).to.be.null
			_.usable(undefined, 'default').should.be.equal 'default'
			_.usable("", 'default').should.be.equal 'default'
			_.usable("titi").should.be.equal 'titi'