lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet
mountFolder = (connect, dir)->
	return connect.static(require('path').resolve(dir))

module.exports = (grunt)->

	grunt.loadNpmTasks('grunt-contrib-livereload')
	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-coffee')
	grunt.loadNpmTasks('grunt-contrib-compass')
	grunt.loadNpmTasks('grunt-contrib-less')
	grunt.loadNpmTasks('grunt-contrib-concat')
	grunt.loadNpmTasks('grunt-contrib-connect')
	grunt.loadNpmTasks('grunt-contrib-copy')
	grunt.loadNpmTasks('grunt-contrib-cssmin')
	grunt.loadNpmTasks('grunt-contrib-htmlmin')
	grunt.loadNpmTasks('grunt-contrib-imagemin')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-requirejs')
	grunt.loadNpmTasks('grunt-regarde')
	grunt.loadNpmTasks('grunt-open')
	grunt.loadNpmTasks('grunt-usemin')

	# configurable paths
	yeomanConfig = {
		app: 'app'
		src: 'src'
		dist: 'dist'

		tmp: '.tmp'
		tmp_dist: '.tmp-dist'
	}

	try
		yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app
	catch e
	
	#
	# Grunt configuration:
	#
	# https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
	#
	grunt.initConfig

		# Project configuration
		# ---------------------
		yeoman: yeomanConfig
		watch:
			coffee:
				files: ['<%= yeoman.src %>/coffee/{,**/}*.coffee']
				tasks: ['coffee:dist']
			
			compass:
				files: ['<%= yeoman.src %>/sass/{,**/}*.{scss,sass}']
				tasks: ['compass:server']
			
			livereload:
				files: [
					'<%= yeoman.tmp %>/{,**/}*.{css,js}'
					'<%= yeoman.app %>/{,**/}*.html'
					'<%= yeoman.app %>/css/{,**/}*.css'
					'<%= yeoman.app %>/js/{,**/}*.js'
					'<%= yeoman.app %>/images/{,**/}*.{png,jpg,jpeg}'
				]
				
				tasks: ['livereload']

		connect:
			livereload:
				options:
					port: 9000
					# Change this to '0.0.0.0' to access the server from outside.
					hostname: 'localhost'
					middleware: (connect)->
						return [
							lrSnippet
							mountFolder(connect, yeomanConfig.tmp)
							mountFolder(connect, yeomanConfig.app)
						]
			dist:
				options:
					port: 9001
					# Change this to '0.0.0.0' to access the server from outside.
					hostname: 'localhost'
					middleware: (connect)->
						return [
							mountFolder(connect, yeomanConfig.dist)
						]

		open:
			livereload:
				path: 'http://localhost:<%= connect.livereload.options.port %>'
			dist:
				path: 'http://localhost:<%= connect.dist.options.port %>'

		clean:
			dist: ['<%= yeoman.dist %>']
			tmp: ['<%= yeoman.tmp %>']
			tmp_dist: ['<%= yeoman.tmp_dist %>']
			components: ['<%= yeoman.dist %>/components']
			templates: ['<%= yeoman.dist %>/templates']

		coffee:
			dist:
				expand: true
				cwd: 'src/coffee/'
				src: ['**/*.coffee']
				dest: '<%= yeoman.tmp %>/js'
				ext: '.js'

		compass:
			options:
				sassDir: '<%= yeoman.src %>/sass'
				cssDir: '<%= yeoman.tmp %>/css'
				imagesDir: '<%= yeoman.app %>/images'
				javascriptsDir: '<%= yeoman.app %>/js'
				fontsDir: './css/fonts'
				importPath: ['<%= yeoman.app %>/components']
				relativeAssets: true
				config: 'compass.rb'

			dist: 
				options:
					force: true
					outputStyle: 'compressed'
					environment: 'production'
			server:
				options:
					debugInfo: true

		less:
			server:
				options:
					dumpLineNumbers: 'all'
				files:
    				'<%= yeoman.tmp %>/css/all-less.css' : '<%= yeoman.app %>/components/bootstrap/less/{bootstrap,responsive}.less'

			dist:
				options:
					compress: true
					yuicompress: true
				files:
    				'<%= yeoman.tmp %>/css/all-less.css' : '<%= yeoman.app %>/components/bootstrap/less/{bootstrap,responsive}.less'

		copy:
			dist:
				files: [
					{ expand: true, cwd: '<%= yeoman.tmp %>/', src: ['**'], dest: '<%= yeoman.tmp_dist %>/' }
					{ expand: true, cwd: '<%= yeoman.app %>/', src: ['**'], dest: '<%= yeoman.tmp_dist %>/' }
				]

		useminPrepare:
			html: '<%= yeoman.tmp_dist %>/index.html'
			options:
				dest: '<%= yeoman.dist %>'

		usemin:
			html: ['<%= yeoman.dist %>/{,*/}*.html']
			css: ['<%= yeoman.dist %>/css/{,*/}*.css']
			options:
				dirs: ['<%= yeoman.dist %>']

		imagemin:
			dist:
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images'
					src: '{,*/}*.{png,jpg,jpeg}'
					dest: '<%= yeoman.dist %>/images'
				}]

		htmlmin:
			dist:
				# options:
				#   removeCommentsFromCDATA: true
				#   # https://github.com/yeoman/grunt-usemin/issues/44
				#   collapseWhitespace: true
				#   collapseBooleanAttributes: true
				#   removeAttributeQuotes: true
				#   removeRedundantAttributes: true
				#   useShortDoctype: true
				#   removeEmptyAttributes: true
				#   removeOptionalTags: true

				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: ['*.html', 'templates/*.html'],
					dest: '<%= yeoman.dist %>'
				}]

		uglify:
			dist:
				files:
					'<%= yeoman.dist %>/js/all.js': [
						'<%= yeoman.dist %>/js/all.js'
					]

		requirejs:
			compile:
				options:
					# no minification, is done by the min task
					baseUrl: 'js/'
					appDir: './<%= yeoman.tmp_dist %>/'
					dir: './<%= yeoman.dist %>/'
					
					wrap: true

					removeCombined: true
					keepBuildDir: true

					inlineText: true
					mainConfigFile: '<%= yeoman.tmp_dist %>/js/main.js'

					optimize: "uglify"

					modules: [
						{ name: 'app/vendors', exclude: [] }
						{ name: 'app/app', exclude: ['app/vendors'] }
						{ name: 'main', exclude: ['config', 'app/app', 'app/vendors'] }
					]

	grunt.renameTask('regarde', 'watch')

	grunt.registerTask('server', [
		'coffee:dist'
		'compass:server'
		'less:server'
		'livereload-start'
		'connect:livereload'
		'open:livereload'
		'watch'
	])

	grunt.registerTask('server-dist', [
		'connect:dist'
		'open:dist'
		'watch:livereload'
	])

	grunt.registerTask('compile', [
		'coffee:dist'
		'compass:server'
		'less:dist'
	])

	grunt.registerTask('build', [
		'clean:dist'
		'clean:tmp'
		'clean:tmp_dist'
		'coffee'
		'compass:dist'
		'less:dist'
		'copy:dist'
		'requirejs:compile'
		'useminPrepare'
		'imagemin'
		'cssmin'
		'htmlmin'
		'concat'
		'usemin'
		'uglify'
		'clean:tmp_dist'
		'clean:components'
		'clean:templates'
	])

	grunt.registerTask('default', ['build'])
