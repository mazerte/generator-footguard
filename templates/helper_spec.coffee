define [
	'spec/helpers/create_context'
	'sinon'
], (create_require_context, sinon)->

	# create a fixtures context
	context = create_require_context
		'path/to/your/resource': true

	describe 'Test <%= _.classify(name) %> Helper', ()->

		before (done)->
			context [
				'app/helpers/<% if( folder ) { print(folder +"/"); } %><%= name %>_helper'
				'app/vendors'
			], (<%= _.classify(name) %>)=>
				@<%= _.classify(name) %> = <%= _.classify(name) %>
				done()

		it '<%= _.classify(name) %> is defined', ()->
			expect(@<%= _.classify(name) %>).not.to.be.undefined
			expect(@<%= _.classify(name) %>).to.be.a "function"