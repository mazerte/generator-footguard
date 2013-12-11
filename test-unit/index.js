/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  grunt = require('grunt'),
  ScriptBase = require('../script-base.js'),
  generatorUtil = require('../util.js');

module.exports = Generator;

function Generator() {
  ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createTestFile = function createTestFile() {
	this.template('test_unit.coffee', path.join('src/coffee/spec/unit', this.folder, this.name + '_spec.coffee'));
	
	generatorUtil.rewriteFile({
		file: 'src/coffee/spec/unit/all_unit_tests.coffee',
		needle: "# <unit> don't remove this comment",
		splicable: [
			'	"' + path.join('spec/unit/', this.folder, this.name + '_spec') + '"'
		]
	});
};
