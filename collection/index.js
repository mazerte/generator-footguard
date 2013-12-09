/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  grunt = require('grunt'),
  ScriptBase = require('../script-base.js'),
  generatorUtil = require('../util.js'),
  ModelUtil = require('../model/util.js')

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
		default: 'y/model/N',
		warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
	}, {
		name: 'test',
		message: 'Would you like to create associate unit test ?',
		default: 'Y/n',
		warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
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
	//console.log('Model: ' + this.model);
	//console.log('Use unit test: ' + this.test);
	this.template('collection.coffee', path.join('src/coffee/app/collections', this.folder, this.name + '_collection.coffee'));

	if( this.model ) {
		ModelUtil.create(this);
	}
	
	if( this.test ) {
		this.template('collection_spec.coffee', path.join('src/coffee/spec/unit/collections', this.folder, this.name + '_collection_spec.coffee'));
		
		generatorUtil.rewriteFile({
			file: 'src/coffee/spec/unit/all_unit_tests.coffee',
			needle: "# <unit> don't remove this comment",
			splicable: [
				'	"' + path.join('spec/unit/collections/', this.folder, this.name + '_collection_spec') + '"'
			]
		});
	}
};
