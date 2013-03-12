define [
	'backbone'
], (Backbone)->
	
	class <%= grunt.util._.classify(name) %> extends Backbone.Model
		
		defaults:
			key: "value"