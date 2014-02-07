'use strict';

var FootguardBase = require('../footguard-base.js'),
    grunt = require('grunt'),
    util = require('util');

var Generator = function Generator() {
  FootguardBase.apply(this, arguments);
};

util.inherits(Generator, FootguardBase);
module.exports = Generator;

Generator.prototype.askFor = function askFor () {
  var cb = this.async();

  var prompts = grunt.util._.flatten([
    this.promptForTest()
  ]);

  this.prompt(prompts, this.parsePromptsResult( function() {
    cb();
  }));
};

Generator.prototype.createHelperFiles = function createHelperFiles() {
  this.template('helper.coffee', this.getElementDest('helper'));

  this.createElementTest('helper');
};
