define [
	'backbone'<% if( model ) { %>
	'app/models/<%= model %>_model' <% } %>
], (Backbone<% if( model ) { print(", " + grunt.util._.classify(model)); } %>)->
	
	class <%= grunt.util._.classify(name) %> extends Backbone.Collection
		<% if( model ) { %>
		model: <%= grunt.util._.classify(model) %>
		<% } %>