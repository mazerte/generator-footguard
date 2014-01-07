'use strict';

var FootguardBase = require('../footguard-base.js'),
    util = require('util');

var Generator = function Generator() {
  FootguardBase.apply(this, arguments);
};

util.inherits(Generator, FootguardBase);
module.exports = Generator;

Generator.prototype.askFor = function askFor () {
  var cb = this.async();

  var prompts = [
    this.promptForTest()
  ];

  this.prompt(prompts, this.parsePromptsResult( function() {
    cb();
  }));
};

Generator.prototype.createHelperFiles = function createHelperFiles() {
  this.template('helper.coffee', this.getElementDest('helper'));

  this.createElementTest('helper');
};
