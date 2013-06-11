define [
	'spec/helpers/create_context'
	'sinon'
], (create_require_context, sinon)->

	# create a fixtures context
	context = create_require_context<% if( model ) { %>
		'app/models/<% if( folder ) { print(folder +"/"); } %><%= model %>_model': true <% } else { %>
		'path/to/your/resource': true<% } %>

	describe 'Test <%= _.classify(name) %> View', ()->

		before (done)->
			context [
				'app/views/<% if( folder ) { print(folder +"/"); } %><%= name %>_view'<% if( model ) { %>
				'app/models/<% if( folder ) { print(folder +"/"); } %><%= model %>_model' <% } %>
				'app/vendors'
			], (<%= _.classify(name) %><% if( model ) { %>, Model<% } %>)=>
				@<%= _.classify(name) %> = <%= _.classify(name) %><% if( model ) { %>
				@Model = Model<% } %>
				done()

		beforeEach ()->
			@<%= name %> = new @<%= _.classify(name) %>()<% if( model ) { %>
			@model = new @Model()<% } %>

		it 'Class <%= _.classify(name) %> exists', ()->
			expect(@<%= _.classify(name) %>).not.to.be.undefined
			expect(@<%= name %>).not.to.be.undefined
		<% if( model ) { %>
		it '<%= _.classify(name) %> View contains <%= _.classify(model) %> Model', ()->
			expect(@<%= name %>).to.be.an.instanceof @Model
		<% } %>