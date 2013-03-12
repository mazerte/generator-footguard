define [
	'backbone'
	'app/views/app_view'
], (Backbone, appView)->

	class Router extends Backbone.Router

		routes:
			'*actions' : 'defaultAction'

		initialize: ()->
			appView.render()
			Backbone.history.start()

		defaultAction: (actions)->
			console.log "Unhandled route #{actions}"
