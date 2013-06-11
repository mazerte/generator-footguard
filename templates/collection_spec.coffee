define [
	'spec/helpers/create_context'
	'sinon'
], (create_require_context, sinon)->

	# create a fixtures context
	context = create_require_context<% if( model ) { %>
		'app/models/<% if( folder ) { print(folder +"/"); } %><%= model %>_model': true <% } else { %>
		'path/to/your/resource': true<% } %>

	describe 'Test <%= _.classify(name) %> Collection', ()->

		before (done)->
			context [
				'app/collections/<% if( folder ) { print(folder +"/"); } %><%= name %>_collection'<% if( model ) { %>
				'app/models/<% if( folder ) { print(folder +"/"); } %><%= model %>_model' <% } %>
				'app/vendors'
			], (<%= _.classify(name) %><% if( model ) { %>, <%= _.classify(model) %><% } %>)=>
				@<%= _.classify(name) %> = <%= _.classify(name) %><% if( model ) { %>
				@<%= _.classify(model) %> = <%= _.classify(model) %> <% } %>
				done()

		beforeEach ()->
			@<%= name %> = new @<%= _.classify(name) %>()<% if( model ) { %>
			@<%= model %> = new @<%= _.classify(model) %>()<% } %>

		it 'Class <%= _.classify(name) %> exists', ()->
			expect(@<%= _.classify(name) %>).not.to.be.undefined
			expect(@<%= name %>).not.to.be.undefined
		<% if( model ) { %>
		it '<%= _.classify(name) %> collection contains <%= _.classify(model) %> elements', ()->
			@<%= name %>.add { name: 'test <%= model %>' }
			expect(@<%= name %>.at(0)).to.be.an.instanceof @<%= _.classify(model) %>
		<% } %>