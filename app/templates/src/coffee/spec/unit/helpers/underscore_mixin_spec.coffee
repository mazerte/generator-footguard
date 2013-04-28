define ['app/helpers/underscore_mixin'], (_)->

	describe 'Test Underscore mixin', ()->
		
		it 'Underscore is defined', ()->
			expect(_).not.to.be.undefined

		it 'isUsable mixin', ()->
			expect(_.isUsable).to.be.a 'function'
			expect( _(undefined).isUsable() ).to.be.false
			expect( _(null).isUsable() ).to.be.false
			expect( _("").isUsable() ).to.be.false
			expect( _({}).isUsable() ).to.be.true
			expect( _("hello").isUsable() ).to.be.true
			expect( _(()->).isUsable() ).to.be.true

		it 'usable mixin', ()->
			expect(_.usable).to.be.a 'function'
			expect( _(undefined).usable('replace') ).to.be.eql 'replace'
			expect( _(null).usable('replace') ).to.be.eql 'replace'
			expect( _("").usable('replace') ).to.be.eql 'replace'
			expect( _({}).usable('replace') ).not.to.be.eql 'replace'
			expect( _("hello").usable('replace') ).to.be.eql 'hello'
			expect( _(()->).usable('replace') ).not.to.be.eql 'replace'