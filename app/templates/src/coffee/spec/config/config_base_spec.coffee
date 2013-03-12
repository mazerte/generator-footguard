define ['config'], (config)->

	describe 'Test configuration', ()->

		it 'Configuration is defined', ()->
			expect(config).not.to.be(undefined)