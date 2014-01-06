'use strict';

var path = require('path'),
    util = require('util'),
    FootguardBase = require('../footguard-base.js');

var Generator = function Generator() {
  FootguardBase.apply(this, arguments);
};

util.inherits(Generator, FootguardBase);
module.exports = Generator;

Generator.prototype.createTestFile = function createTestFile() {
  var dest = path.join(this.folder, this.name);
  this.createTest('integration', 'test_integration.coffee', dest);
};
