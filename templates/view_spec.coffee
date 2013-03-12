define ['app/views/<%= name %>_view'], (<%= grunt.util._.classify(name) %>)->

	describe 'Test <%= grunt.util._.classify(name) %> View', ()->

		it '<%= grunt.util._.classify(name) %> is defined', ()->
			expect(<%= grunt.util._.classify(name) %>).not.to.be(undefined)