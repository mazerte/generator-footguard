define [
	'backbone'
], (Backbone)->

	class <%= _.classify(name) %>ViewMock extends Backbone.View
			
		render: ->