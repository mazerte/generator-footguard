/*global describe, beforeEach, it*/
'use strict';

var path = require('path'),
    helpers = require('yeoman-generator').test;


describe('Yeoman generator - collection', function () {

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

  it('create collection without test and model', function (done) {
    var helper = helpers.createGenerator(
      'footguard:collection',
      ['../../collection'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      model: 'n',
      test: 'n'
    });

    helper.run([], function() {
      helpers.assertFiles([
        ['src/coffee/app/collections/foo_collection.coffee',
          /class FooCollection extends Backbone.Collection/]
      ]);
      done();
    });
  });

  it('create collection in folder without test and model', function (done) {
    var helper = helpers.createGenerator(
      'footguard:collection',
      ['../../collection'],
      ['foo', 'boo']
    );

    helpers.mockPrompt(helper, {
      model: 'n',
      test: 'n'
    });

    helper.run([], function() {
      helpers.assertFiles([
        ['src/coffee/app/collections/boo/foo_collection.coffee',
          /class FooCollection extends Backbone.Collection/]
      ]);
      done();
    });
  });

  it('create collection with test and without model', function (done) {
    var helper = helpers.createGenerator(
      'footguard:collection',
      ['../../collection'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      model: 'n',
      test: 'y'
    });

    helper.run([], function() {
      helpers.assertFiles([
        ['src/coffee/app/collections/foo_collection.coffee',
          /class FooCollection extends Backbone.Collection/],
        ['src/coffee/spec/unit/collections/foo_collection_spec.coffee',
          /Test Foo Collection/],
        ['src/coffee/spec/unit/collections/foo_collection_spec.coffee',
          /define \['app\/collections\/foo_collection'\], \(Foo\) ->/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /"spec\/unit\/collections\/foo_collection_spec"/]
      ]);
      done();
    });
  });

  it('create collection in folder with test and without model', function (done) {
    var helper = helpers.createGenerator(
      'footguard:collection',
      ['../../collection'],
      ['foo', 'boo']
    );

    helpers.mockPrompt(helper, {
      model: 'n',
      test: 'y'
    });

    helper.run([], function() {
      helpers.assertFiles([
        ['src/coffee/app/collections/boo/foo_collection.coffee',
          /class FooCollection extends Backbone.Collection/],
        ['src/coffee/spec/unit/collections/boo/foo_collection_spec.coffee',
          /Test Foo Collection/],
        ['src/coffee/spec/unit/collections/boo/foo_collection_spec.coffee',
          /define \['app\/collections\/boo\/foo_collection'\], \(Foo\) ->/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /"spec\/unit\/collections\/boo\/foo_collection_spec"/]
      ]);
      done();
    });
  });

  it('create collection with model and without test', function(done) {
    var helper = helpers.createGenerator(
      'footguard:collection',
      ['../../collection'],
      ['people']
    );

    helpers.mockPrompt(helper, {
      model: 'y',
      test: 'n'
    });

    helper.run([], function() {
      helpers.assertFiles([
        ['src/coffee/app/collections/people_collection.coffee',
          /class PeopleCollection extends Backbone.Collection/],
        ['src/coffee/app/models/person_model.coffee',
          /class PersonModel extends Backbone.Model/]
      ]);
      done();
    });
  });

  it('create collection with model and test', function(done) {
    var helper = helpers.createGenerator(
      'footguard:collection',
      ['../../collection'],
      ['people']
    );

    helpers.mockPrompt(helper, {
      model: 'y',
      test: 'y'
    });

    helper.run([], function() {
      helpers.assertFiles([
        ['src/coffee/app/collections/people_collection.coffee',
          /class PeopleCollection extends Backbone.Collection/],
        ['src/coffee/spec/unit/collections/people_collection_spec.coffee',
          /Test People Collection/],
        ['src/coffee/spec/unit/collections/people_collection_spec.coffee',
          /define \['app\/collections\/people_collection'\], \(People\) ->/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /"spec\/unit\/collections\/people_collection_spec"/],

        ['src/coffee/app/collections/people_collection.coffee',
          /'app\/models\/person_model'/],
        ['src/coffee/app/collections/people_collection.coffee',
          /Backbone, Person/],
        ['src/coffee/app/collections/people_collection.coffee',
          /model: Person/],

        ['src/coffee/app/models/person_model.coffee',
          /class PersonModel extends Backbone.Model/],
        ['src/coffee/spec/unit/models/person_model_spec.coffee',
          /Test Person Model/],
        ['src/coffee/spec/unit/models/person_model_spec.coffee',
          /define \['app\/models\/person_model'\], \(Person\) ->/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /"spec\/unit\/models\/person_model_spec"/]
      ]);
      done();
    });
  });

  it('create collection in folder with model and without test', function(done) {
    var helper = helpers.createGenerator(
      'footguard:collection',
      ['../../collection'],
      ['people', 'bar']
    );

    helpers.mockPrompt(helper, {
      model: 'y',
      test: 'n'
    });

    helper.run([], function() {
      helpers.assertFiles([
        ['src/coffee/app/collections/bar/people_collection.coffee',
          /class PeopleCollection extends Backbone.Collection/],
        ['src/coffee/app/models/bar/person_model.coffee',
          /class PersonModel extends Backbone.Model/]
      ]);
      done();
    });
  });

  it('create collection in folder with model and test', function(done) {
    var helper = helpers.createGenerator(
      'footguard:collection',
      ['../../collection'],
      ['people', 'bar']
    );

    helpers.mockPrompt(helper, {
      model: 'y',
      test: 'y'
    });

    helper.run([], function() {
      helpers.assertFiles([
        ['src/coffee/app/collections/bar/people_collection.coffee',
          /class PeopleCollection extends Backbone.Collection/],
        ['src/coffee/spec/unit/collections/bar/people_collection_spec.coffee',
          /Test People Collection/],
        ['src/coffee/spec/unit/collections/bar/people_collection_spec.coffee',
          /define \['app\/collections\/bar\/people_collection'\], \(People\) ->/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /"spec\/unit\/collections\/bar\/people_collection_spec"/],

        ['src/coffee/app/collections/bar/people_collection.coffee',
          /'app\/models\/bar\/person_model'/],
        ['src/coffee/app/collections/bar/people_collection.coffee',
          /Backbone, Person/],
        ['src/coffee/app/collections/bar/people_collection.coffee',
          /model: Person/],

        ['src/coffee/app/models/bar/person_model.coffee',
          /class PersonModel extends Backbone.Model/],
        ['src/coffee/spec/unit/models/bar/person_model_spec.coffee',
          /Test Person Model/],
        ['src/coffee/spec/unit/models/bar/person_model_spec.coffee',
          /define \['app\/models\/bar\/person_model'\], \(Person\) ->/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /"spec\/unit\/models\/bar\/person_model_spec"/]
      ]);
      done();
    });
  });

  it('create collection and change model name', function(done) {
    var helper = helpers.createGenerator(
      'footguard:collection',
      ['../../collection'],
      ['people']
    );

    helpers.mockPrompt(helper, {
      model: 'animal',
      test: 'n'
    });

    helper.run([], function() {
      helpers.assertFiles([
        ['src/coffee/app/collections/people_collection.coffee',
          /class PeopleCollection extends Backbone.Collection/],
        ['src/coffee/app/models/animal_model.coffee',
          /class AnimalModel extends Backbone.Model/]
      ]);
      done();
    });
  });

});
