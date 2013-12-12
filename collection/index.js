/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  grunt = require('grunt'),
  ScriptBase = require('../script-base.js'),
  generatorUtil = require('../util.js');

grunt.util._.mixin( require('underscore.inflections') );

module.exports = Generator;

function Generator() {
	ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.askFor = function askFor() {
	var cb = this.async(),
		self = this;

	// a bit verbose prompt configuration, maybe we can improve that
	// demonstration purpose. Also, probably better to have this in other generator, whose responsability is to ask
	// and fetch all realated bootstrap stuff, that we hook from this generator.
	var prompts = [{
		name: 'model',
		message: 'Would you like to create associate model (' + grunt.util._.singularize(this.name) + ')?',
		default: 'y/model/N'
	}, {
		name: 'test',
		message: 'Would you like to create associate unit test ?',
		default: 'Y/n'
	}];
  
	this.prompt(prompts, function(props) {		
		// manually deal with the response, get back and store the results.
		// We change a bit this way of doing to automatically do this in the self.prompt() method.
		self.model = false;
		if( props.model !== "y/model/N" ) {
			if( props.model === "y" ) {
				self.model = grunt.util._.singularize(self.name);
			} else if( !(/^n$/i).test(props.model) ) {
				self.model = props.model;
			}
		}
		
		self.test = (/y/i).test(props.test);
		
		// we're done, go through next step
		cb();
	});
};

Generator.prototype.createCollectionFiles = function createCollectionFiles() {
	this.template('collection.coffee', path.join('src/coffee/app/collections', this.folder, this.name + '_collection.coffee'));

	if( this.model ) {
		generatorUtil.createModel(this, this.model, this.folder, this.test);
	}
	
	if( this.test ) {
		generatorUtil.createTest(this, 'unit', 'collection_spec.coffee', path.join('collections', this.folder, this.name + '_collection'));
	}
};
