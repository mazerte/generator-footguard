'use strict';

var util = require('util'),
    grunt = require('grunt'),
    FootguardBase = require('../footguard-base.js');

grunt.util._.mixin( require('underscore.inflections') );

var Generator = function Generator() {
  FootguardBase.apply(this, arguments);
};

util.inherits(Generator, FootguardBase);
module.exports = Generator;

Generator.prototype.askFor = function askFor() {
  var cb = this.async(),
    self = this;

  var modelName = grunt.util._.singularize(this.name);
  var prompts = [
    this.promptForModel(modelName),
    this.promptForTest()
  ];
  
  this.prompt(prompts, this.parsePromptsResult( function(props) {
    self.model = false;
    if( props.model !== 'y/model/N' ) {
      if( (/^y$/i).test(props.model) ) {
        self.model = modelName;
      } else if( !(/^n$/i).test(props.model) ) {
        self.model = props.model;
      }
    }

    cb();
  }));
};

Generator.prototype.createCollectionFiles = function createCollectionFiles() {
  this.template('collection.coffee', this.getElementDest('collection'));

  this.createModel(this.model);
  this.createElementTest('collection');
};
