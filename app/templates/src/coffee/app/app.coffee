define [
	'app/router'
	'config'
], (Router)->

	app = null
	initialize = ->
		app = new Router()
	return {
		router: app
		initialize: initialize
	}
