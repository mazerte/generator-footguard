/*global describe, beforeEach, it*/
'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;


describe('Yeoman generator', function () {

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, './.tmp'), function (err) {
      if (err) {
        return done(err);
      }
      this.footguard = {};
      this.footguard.app = helpers.createGenerator(
        'footguard:app',
        ['../../app'],
        ['my-project']
      );

      this.footguard.app.options['skip-install'] = true;

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      '.bowerrc',
      'bower.json',
      'Gruntfile.coffee',
      'package.json',

      'app/index.html',
      'app/templates/',

      'src/coffee/main.coffee',
      'src/coffee/app/app.coffee',
      'src/coffee/app/router.coffee',
      'src/coffee/app/vendors.coffee',
      'src/coffee/app/config/config_base.coffee',
      'src/coffee/spec/all_tests.coffee',

      'src/sass/main.sass',
      'src/sass/_app.sass',
    ];

    this.footguard.app.run({}, function() {
      assert.file(expected);
      assert.fileContent([
        ['package.json', /"name": "my-project"/]
      ]);
      done();
    });
  });

});
