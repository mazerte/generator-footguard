define ['app/app'], (app)->

	describe 'Test application', ()->

		it 'Application is defined', ()->
			expect(app).not.to.be(undefined)