/*global describe, beforeEach, it*/
'use strict';

var path = require('path'),
    helpers = require('yeoman-generator').test;


describe('Yeoman generator - helper', function () {

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, './.tmp'), function (err) {
      if (err) {
        return done(err);
      }
      this.footguard = {};
      this.footguard.app = helpers.createGenerator('footguard:app', [
        '../../app'
      ]);

      this.footguard.app.options['skip-install'] = true;

      this.footguard.app.run({}, function() {
        done();
      });
    }.bind(this));
  });

  it('create helper without test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:helper',
      ['../../helper'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      test: 'n'
    });

    helper.run([], function() {
      helpers.assertFiles([
        ['src/coffee/app/helpers/foo_helper.coffee',
          /Foo = ->/]
      ]);
      done();
    });
  });

  it('create helper in folder without test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:helper',
      ['../../helper'],
      ['foo', 'boo']
    );

    helpers.mockPrompt(helper, {
      test: 'n'
    });

    helper.run([], function() {
      helpers.assertFiles([
        ['src/coffee/app/helpers/boo/foo_helper.coffee',
          /Foo = ->/]
      ]);
      done();
    });
  });

  it('create helper with test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:helper',
      ['../../helper'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      test: 'y'
    });

    helper.run([], function() {
      helpers.assertFiles([
        ['src/coffee/app/helpers/foo_helper.coffee',
          /Foo = ->/],
        ['src/coffee/spec/unit/helpers/foo_helper_spec.coffee',
          /Test Foo Helper/],
        ['src/coffee/spec/unit/helpers/foo_helper_spec.coffee',
          /define \['app\/helpers\/foo_helper'\], \(Foo\) ->/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /"spec\/unit\/helpers\/foo_helper_spec"/]
      ]);
      done();
    });
  });

  it('create helper in folder with test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:helper',
      ['../../helper'],
      ['foo', 'boo']
    );

    helpers.mockPrompt(helper, {
      test: 'y'
    });

    helper.run([], function() {
      helpers.assertFiles([
        ['src/coffee/app/helpers/boo/foo_helper.coffee',
          /Foo = ->/],
        ['src/coffee/spec/unit/helpers/boo/foo_helper_spec.coffee',
          /Test Foo Helper/],
        ['src/coffee/spec/unit/helpers/boo/foo_helper_spec.coffee',
          /define \['app\/helpers\/boo\/foo_helper'\], \(Foo\) ->/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /"spec\/unit\/helpers\/boo\/foo_helper_spec"/]
      ]);
      done();
    });
  });

});
