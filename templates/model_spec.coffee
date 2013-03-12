define ['app/models/<%= name %>_model'], (<%= grunt.util._.classify(name) %>)->

	describe 'Test <%= grunt.util._.classify(name) %> Model', ()->

		it '<%= grunt.util._.classify(name) %> is defined', ()->
			expect(<%= grunt.util._.classify(name) %>).not.to.be(undefined)