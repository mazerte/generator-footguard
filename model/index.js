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

Generator.prototype.askFor = function askFor () {
	var cb = this.async(),
		self = this;

	var prompts = [{
		name: 'test',
		message: 'Would you like to create associate unit test ?',
		default: 'Y/n'
	}];
  
	this.prompt(prompts, function(props) {
		self.test = (/y/i).test(props.test);
		cb();
	});
};

Generator.prototype.createModelFiles = function createModelFiles() {
	var dest = path.join(
		'src/coffee/app/models', 
		this.folder, 
		this.name + '_model.coffee'
	);
	this.template('model.coffee', dest);
	
	if( this.test ) {
		dest = path.join('models', this.folder, this.name + '_model');
		generatorUtil.createTest(this, 'unit', 'model_spec.coffee', dest);
	}
};
