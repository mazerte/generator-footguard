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

Generator.prototype.createHelperFiles = function createHelperFiles() {	
	var dest = path.join(
		'src/coffee/app/helpers', 
		this.folder, 
		this.name + '_helper.coffee'
	);
	this.template('helper.coffee', dest);
	
	if( this.test ) {
		dest = path.join('helpers', this.folder, this.name + '_helper');
		generatorUtil.createTest(this, 'unit', 'helper_spec.coffee', dest);
	}
};
