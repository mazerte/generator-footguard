/*jshint latedef:false */
var util = require('util'),
	FootguardBase = require('../footguard-base.js');

module.exports = Generator;

function Generator() {
	FootguardBase.apply(this, arguments);
}

util.inherits(Generator, FootguardBase);

Generator.prototype.askFor = function askFor () {
	var cb = this.async(),
		self = this;

	var prompts = [
		this.promptForTest()
	];
  
	this.prompt(prompts, this.parsePromptsResult( function(props) {
		cb();
	}));
};

Generator.prototype.createModelFiles = function createModelFiles() {
	this.template('model.coffee', this.getElementDest('model'));
	
	this.createElementTest('model');
};
