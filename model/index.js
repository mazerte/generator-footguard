/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  grunt = require('grunt'),
  ScriptBase = require('../script-base.js');

grunt.util._.mixin( require('underscore.inflections') );

module.exports = Generator;

function Generator() {
  ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.askFor = function askFor () {
	var cb = this.async(),
		self = this;

	// a bit verbose prompt configuration, maybe we can improve that
	// demonstration purpose. Also, probably better to have this in other generator, whose responsability is to ask
	// and fetch all realated bootstrap stuff, that we hook from this generator.
	var prompts = [{
		name: 'test',
		message: 'Would you like to create associate unit test ?',
		default: 'Y/n'
	}];
  
	this.prompt(prompts, function(props) {
		// manually deal with the response, get back and store the results.
		// We change a bit this way of doing to automatically do this in the self.prompt() method.
		self.test = (/y/i).test(props.test);
		
		// we're done, go through next step
		cb();
	});
};

Generator.prototype.createModelFiles = function createModelFiles() {
	this.template('model.coffee', path.join('src/coffee/app/models', this.folder, this.name + '_model.coffee'));
	
	if( this.test ) {
		generatorUtil = require('../util.js');
		generatorUtil.createTest(this, 'unit', 'model_spec.coffee', path.join('models', this.folder, this.name + '_model'));
	}
};
