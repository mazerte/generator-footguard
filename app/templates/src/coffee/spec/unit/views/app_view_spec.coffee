define [
	'spec/helpers/create_context'
	'sinon'
], (create_require_context, sinon)->

	# create a fixtures context
	context = create_require_context
		'path/to/your/resource': true

	describe 'Test App View', ()->

		before (done)->
			context [
				'app/views/app_view'
				'app/vendors'
			], (app_view)=>
				@app_view = app_view
				done()

		it 'App View instance exists', ()->
			expect(@app_view).not.to.be.undefined
		