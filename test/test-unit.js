/*global describe, beforeEach, it*/
'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;


describe('Yeoman generator - test unit', function () {

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
      'footguard:test-unit',
      ['../../test-unit'],
      ['foo']
    );

    helper.run([], function() {
      assert.fileContent([
        ['src/coffee/spec/unit/foo_spec.coffee',
          /Test Foo/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /spec\/unit\/foo_spec/]
      ]);
      done();
    });
  });

  it('create helper in folder without test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:test-unit',
      ['../../test-unit'],
      ['foo', 'boo']
    );

    helper.run([], function() {
      assert.fileContent([
        ['src/coffee/spec/unit/boo/foo_spec.coffee',
          /Test Foo/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /spec\/unit\/boo\/foo_spec/]
      ]);
      done();
    });
  });

});
