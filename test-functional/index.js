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
	this.template('test_functional.coffee', path.join('src/coffee/spec/functional', this.folder, this.name + '_spec.coffee'));
	
	var file = 'src/coffee/spec/functional/all_functional_tests.coffee';
  var body = grunt.file.read(file);

  body = generatorUtil.rewrite({
    needle: '# <functional> don\'t remove this comment',
    haystack: body,
    splicable: [
      '	"' + path.join('spec/functional', this.folder, this.name + '_spec') + '"'
    ]
  });

  grunt.file.write(file, body);
};
