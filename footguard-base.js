'use strict';

var path = require('path'),
    util = require('util'),
    grunt = require('grunt'),
    yeoman = require('yeoman-generator'),
    generatorUtil = require('./util.js'),
    helpers = require('yeoman-generator').test;

grunt.util._.mixin( require('underscore.inflections') );

var Generator = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.appname = path.basename(process.cwd());

  this.argument('folder', { type: String, required: false, defaults: '' });

  this.sourceRoot(path.join(__dirname, './templates'));
};

util.inherits(Generator, yeoman.generators.NamedBase);
module.exports = Generator;

/////////////
// PROMPTS //
/////////////
Generator.prototype.promptForTest = function promptForTest() {
  return [{
    type: 'confirm',
    name: 'test',
    message: 'Would you like to create associate unit test ?',
    default: true
  }];
};

Generator.prototype.promptForModel = function promptForModel(name) {
  return this._promptForNamed('model', 'model', name);
};

Generator.prototype.promptForTemplate = function promptForTemplate(name) {
  return this._promptForNamed('tpl', 'template', name);
};

Generator.prototype.promptForSass = function promptForSass(name) {
  return this._promptForNamed('sass', 'sass file', name);
};

Generator.prototype._promptForNamed = function _promptForNamed(type, typeName, name) {
  return [{
    type: 'confirm',
    name: type,
    message: 'Would you like to create associate ' + typeName + ' ?',
    default: true
  }, {
    type: 'input',
    name: type + 'Name',
    message: 'What name would you like ?',
    default: name,
    when: function( answers ) {
      return answers[type];
    }
  }];
};

Generator.prototype.parsePromptsResult = function parsePromptsResult(callback) {
  var _this = this;
  return function(answers) {
    _this._parsePromptForName('model', answers);
    _this._parsePromptForName('tpl', answers);
    _this._parsePromptForName('sass', answers);

    _this.test = answers.test;

    callback(answers);
  };
};

Generator.prototype._parsePromptForName = function _parsePromptForName(name, answers) {
  if (answers[name] !== undefined) {
    this[name] = answers[name];
    if (this[name]) {
      this[name] = answers[name + 'Name'];
    }
  }
};


//////////////////
// DESTINATIONS //
//////////////////
Generator.prototype.getElementDest = function getElementDest(type) {
  return path.join(
    'src/coffee/app/' + grunt.util._.pluralize(type),
    this.folder,
    this.name + '_' + type + '.coffee'
  );
};


////////////
// CREATE //
////////////
Generator.prototype.createElementTest = function createElementTest(type) {
  if( this.test ) {
    var folder = grunt.util._.pluralize(type);
    var dest = path.join(folder, this.folder, this.name + '_' + type);
    this.createTest('unit', type + '_spec.coffee', dest);
  }
};

Generator.prototype.createTest = function createTest(type, template, file) {
  var dest = path.join('src/coffee/spec/', type, file + '_spec.coffee');
  this.template(template, dest);

  generatorUtil.rewriteFile({
    file: 'src/coffee/spec/' + type + '/all_' + type + '_tests.coffee',
    needle: '# <" + type + "> don\'t remove this comment',
    splicable: [
      ' "' + path.join('spec/', type, file) + '_spec"'
    ]
  });
};

Generator.prototype.createModel = function createModel(name, folder, test) {
  name = name || this.name;
  folder = folder || this.folder;
  test = test || this.test;

  if( this.model ) {
    var mg = helpers.createGenerator(
      'footguard:model',
      [__dirname + '/model'],
      [name, folder]
    );
    mg.options['skip-install'] = true;
    helpers.mockPrompt(mg, {
      test: test
    });
    mg.run();
  }
};
