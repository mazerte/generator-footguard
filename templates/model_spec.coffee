define [
	'spec/helpers/create_context'
	'sinon'
], (create_require_context, sinon)->

	# create a fixtures context
	context = create_require_context
		'path/to/your/resource': true

	describe 'Test <%= _.classify(name) %> Model', ()->

		before (done)->
			context [
				'app/models/<% if( folder ) { print(folder +"/"); } %><%= name %>_model'
				'app/vendors'
			], (<%= _.classify(name) %>)=>
				@<%= _.classify(name) %> = <%= _.classify(name) %>
				done()

		beforeEach ()->
			@<%= name %> = new @<%= _.classify(name) %>()

		it '<%= _.classify(name) %> is defined', ()->
			expect(@<%= _.classify(name) %>).not.to.be.undefined
			expect(@<%= name %>).not.to.be.undefined
			expect(@<%= name %>).to.be.an.instanceof @<%= _.classify(name) %>