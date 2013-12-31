/*jshint latedef:false */
var path = require('path'),
	util = require('util'),
	ScriptBase = require('../script-base.js'),
	generatorUtil = require('../util.js');

module.exports = Generator;

function Generator() {
	ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createTestFile = function createTestFile() {
	var dest = path.join(this.folder, this.name);
	generatorUtil.createTest(this, 'unit', 'test_unit.coffee', dest);
};
