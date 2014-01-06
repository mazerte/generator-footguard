/*global describe, beforeEach, it*/
'use strict';

var path = require('path'),
    helpers = require('yeoman-generator').test,
    assert = require('assert');


describe('Yeoman generator - test functional', function () {

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
      'footguard:test-functional', 
      ['../../test-functional'], 
      ['foo']
    );

    helper.run([], function() {
      helpers.assertFiles([
        ['src/coffee/spec/functional/foo_spec.coffee', 
          /Test \(Functional\) Foo/],
        ['src/coffee/spec/functional/all_functional_tests.coffee', 
          /spec\/functional\/foo_spec/]
      ]);
      done();
    });
  });

  it('create helper in folder without test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:test-functional', 
      ['../../test-functional'], 
      ['foo', 'boo']
    );

    helper.run([], function() {
      helpers.assertFiles([
        ['src/coffee/spec/functional/boo/foo_spec.coffee', 
          /Test \(Functional\) Foo/],
        ['src/coffee/spec/functional/all_functional_tests.coffee', 
          /spec\/functional\/boo\/foo_spec/]
      ]);
      done();
    });
  });

});