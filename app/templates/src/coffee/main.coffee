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

		'bootstrap-affix': 			{ deps: ['jquery'], exports: '$' }
		'bootstrap-alert': 			{ deps: ['jquery'], exports: '$' }
		'bootstrap-button': 		{ deps: ['jquery'], exports: '$' }
		'bootstrap-carousel': 	{ deps: ['jquery'], exports: '$' }
		'bootstrap-collapse': 	{ deps: ['jquery'], exports: '$' }
		'bootstrap-dropdown': 	{ deps: ['jquery'], exports: '$' }
		'bootstrap-modal': 			{ deps: ['jquery'], exports: '$' }
		'bootstrap-popover': 		{ deps: ['jquery'], exports: '$' }
		'bootstrap-scrollspy': 	{ deps: ['jquery'], exports: '$' }
		'bootstrap-tab': 				{ deps: ['jquery'], exports: '$' }
		'bootstrap-tooltip': 		{ deps: ['jquery'], exports: '$' }
		'bootstrap-transition': { deps: ['jquery'], exports: '$' }
		'bootstrap-typeahead': 	{ deps: ['jquery'], exports: '$' }

		'modernizr':
			exports: 'Modernizr'

	paths:
		'underscore': '../components/underscore/underscore'
		'backbone': 	'../components/backbone/backbone'
		'jquery': 		'../components/jquery/jquery'
		'text' : 			'../components/requirejs-text/text'
		'domReady': 	'../components/domReady/domReady'
		'modernizr': 	'../components/modernizr/modernizr'
		'templates': '../templates'

		'bootstrap-affix': 			'../components/bootstrap/js/bootstrap-affix'
		'bootstrap-alert': 			'../components/bootstrap/js/bootstrap-alert'
		'bootstrap-button': 		'../components/bootstrap/js/bootstrap-button'
		'bootstrap-carousel': 	'../components/bootstrap/js/bootstrap-carousel'
		'bootstrap-collapse': 	'../components/bootstrap/js/bootstrap-collapse'
		'bootstrap-dropdown': 	'../components/bootstrap/js/bootstrap-dropdown'
		'bootstrap-modal': 			'../components/bootstrap/js/bootstrap-modal'
		'bootstrap-popover': 		'../components/bootstrap/js/bootstrap-popover'
		'bootstrap-scrollspy':	'../components/bootstrap/js/bootstrap-scrollspy'
		'bootstrap-tab': 				'../components/bootstrap/js/bootstrap-tab'
		'bootstrap-tooltip': 		'../components/bootstrap/js/bootstrap-tooltip'
		'bootstrap-transition':	'../components/bootstrap/js/bootstrap-transition'
		'bootstrap-typeahead': 	'../components/bootstrap/js/bootstrap-typeahead'

		'config': 		'app/config/config_base'

if !window.isTest
	require ['app/vendors'], ->

		require ['app/app'], (App) ->
			App.initialize()

# else
# 	require [
# 		'../components/chai/chai',
# 		'../components/expect/expect',
# 		'../components/mocha/mocha'
# 	], (chai)->
  
# 		mocha.setup('bdd')
# 		#expect = chai.expect
  
# 		if location.hash is '#testem'
# 			require ['../../testem']
  
# 		require [
# 			'../runner/mocha',
# 			'spec/all_tests'
# 		], (runner)->
# 			expect = chai.expect
# 			runner()