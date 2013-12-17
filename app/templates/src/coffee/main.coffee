requirejs.config
	baseUrl: './js'
	shim:
		'underscore':
			exports: '_'
		'jquery':
			exports: '$'
		'backbone':
			deps: ['underscore', 'jquery']
			exports: 'Backbone'

		'bootstrap-affix': 		{ deps: ['jquery'], exports: '$' }
		'bootstrap-alert': 		{ deps: ['jquery'], exports: '$' }
		'bootstrap-button': 	{ deps: ['jquery'], exports: '$' }
		'bootstrap-carousel': 	{ deps: ['jquery'], exports: '$' }
		'bootstrap-collapse': 	{ deps: ['jquery'], exports: '$' }
		'bootstrap-dropdown': 	{ deps: ['jquery'], exports: '$' }
		'bootstrap-modal': 		{ deps: ['jquery'], exports: '$' }
		'bootstrap-popover': 	{ deps: ['jquery'], exports: '$' }
		'bootstrap-scrollspy': 	{ deps: ['jquery'], exports: '$' }
		'bootstrap-tab': 		{ deps: ['jquery'], exports: '$' }
		'bootstrap-tooltip': 	{ deps: ['jquery'], exports: '$' }
		'bootstrap-transition': { deps: ['jquery'], exports: '$' }
		'bootstrap-typeahead': 	{ deps: ['jquery'], exports: '$' }

		'modernizr':
			exports: 'Modernizr'

	paths:
		'underscore': 	'../components/underscore/underscore'
		'backbone': 	'../components/backbone/backbone'
		'jquery': 		'../components/jquery/jquery'
		'text' : 		'../components/requirejs-text/text'
		'domReady': 	'../components/requirejs-domready/domReady'
		'modernizr': 	'../components/modernizr/modernizr'
		'templates': 	'../templates'

		'bootstrap-affix': 		'../components/bootstrap/js/bootstrap-affix'
		'bootstrap-alert': 		'../components/bootstrap/js/bootstrap-alert'
		'bootstrap-button': 	'../components/bootstrap/js/bootstrap-button'
		'bootstrap-carousel': 	'../components/bootstrap/js/bootstrap-carousel'
		'bootstrap-collapse': 	'../components/bootstrap/js/bootstrap-collapse'
		'bootstrap-dropdown': 	'../components/bootstrap/js/bootstrap-dropdown'
		'bootstrap-modal': 		'../components/bootstrap/js/bootstrap-modal'
		'bootstrap-popover': 	'../components/bootstrap/js/bootstrap-popover'
		'bootstrap-scrollspy':	'../components/bootstrap/js/bootstrap-scrollspy'
		'bootstrap-tab': 		'../components/bootstrap/js/bootstrap-tab'
		'bootstrap-tooltip': 	'../components/bootstrap/js/bootstrap-tooltip'
		'bootstrap-transition':	'../components/bootstrap/js/bootstrap-transition'
		'bootstrap-typeahead': 	'../components/bootstrap/js/bootstrap-typeahead'

		'config': 		'app/config/config_base'

require ['app/vendors'], ->

	require ['app/app', 'jquery'], (App, $) ->
		App.initialize()

		if window.is_test
			mocha_div = $('<div />', { id: 'mocha' })
			$('body').prepend(mocha_div)

			$('head').append('<link rel="stylesheet" href="components/mocha/mocha.css">')
			$('head').append('<link rel="stylesheet" href="runner/test.css">')

			require [
				'../components/chai/chai'
				'../components/chai-backbone/chai-backbone'
				'../components/chai-jquery/chai-jquery'
				'../components/sinon-chai/lib/sinon-chai'
			], (chai, chaiBackbone, chaiJQuery, sinonChai)->

				unless window.PHANTOMJS
					mocha.setup
						ui: 'bdd'
						bail: false
						ignoreLeaks: true
						timeout: 5000

				expect = window.expect = chai.expect
				
				chai.should()
				chai.use chaiBackbone
				chai.use chaiJQuery
				chai.use sinonChai
		  
				require [
					'spec/all_tests'
					'../runner/bridge'
				], (runner)->
					mocha.run()