/*jshint latedef:false */
var path = require('path'),
    util = require('util'),
    FootguardBase = require('../footguard-base.js');

module.exports = Generator;

function Generator() {
  FootguardBase.apply(this, arguments);
}

util.inherits(Generator, FootguardBase);

Generator.prototype.createTestFile = function createTestFile() {
  var dest = path.join(this.folder, this.name);
  this.createTest('unit', 'test_unit.coffee', dest);
};
