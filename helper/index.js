/*jshint latedef:false */
var FootguardBase = require('../footguard-base.js')
	util = require('util');

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
  
	this.prompt(prompts, function(props) {		
		self.test = (/y/i).test(props.test);
		cb();
	});
};

Generator.prototype.createHelperFiles = function createHelperFiles() {	
	this.template('helper.coffee', this.getElementDest('helper'));
	
	this.createElementTest('helper');
};
