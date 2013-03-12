define ['app/collections/<%= name %>_collection'], (<%= grunt.util._.classify(name) %>)->

	describe 'Test <%= grunt.util._.classify(name) %> Collection', ()->

		it '<%= grunt.util._.classify(name) %> is defined', ()->
			expect(<%= grunt.util._.classify(name) %>).not.to.be(undefined)