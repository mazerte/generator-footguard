define ['app/helpers/<%= name %>_helper'], (<%= grunt.util._.classify(name) %>)->

	describe 'Test <%= grunt.util._.classify(name) %> Helper', ()->

		it '<%= grunt.util._.classify(name) %> is defined', ()->
			expect(<%= grunt.util._.classify(name) %>).not.to.be(undefined)
			expect(<%= grunt.util._.classify(name) %>).to.be.a("function")