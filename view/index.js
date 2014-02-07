'use strict';

var path = require('path'),
    util = require('util'),
    grunt = require('grunt'),
    generatorUtil = require('../util.js'),
    FooguardBase = require('../footguard-base.js');

var Generator = function Generator() {
  FooguardBase.apply(this, arguments);
};

util.inherits(Generator, FooguardBase);
module.exports = Generator;

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = grunt.util._.flatten([
    this.promptForModel(this.name),
    this.promptForTemplate(this.name),
    this.promptForSass(this.name),
    this.promptForTest()
  ]);
  
  this.prompt(prompts, this.parsePromptsResult( function() {
    cb();
  }));
};

Generator.prototype.createViewFiles = function createViewFiles() {
  var dest;

  this.template('view.coffee', this.getElementDest('view'));
  
  this.createModel(this.model);
  this.createElementTest('view');
  
  if( this.sass ) {
    dest = path.join('src/sass', this.folder, '_' + this.sass + '.sass');
    this.template('view.sass', dest);
    
    generatorUtil.rewriteFile({
      file: 'src/sass/main.sass',
      needle: '# <here> don\'t remove this comment',
      splicable: [
        '@import ' + path.join(this.folder, this.sass)
      ]
    });
  }
  
  if( this.tpl ) {
    dest = path.join('app/templates', this.folder, this.tpl + '.html');
    this.template('view.html', dest);
  }
};
