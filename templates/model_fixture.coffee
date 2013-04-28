define [
	'backbone'
], (Backbone)->
	
	class <%= _.classify(name) %>ModelMock extends Backbone.Model
		
		defaults:
			key: "value"