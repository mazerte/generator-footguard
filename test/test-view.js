/*global describe, beforeEach, it*/
'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;


describe('Yeoman generator - view', function () {

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

  it('create view without model, template, sass and test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:view',
      ['../../view', '../../model'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      model: false,
      tpl: false,
      sass: false,
      test: false
    }, { useDefaults: true });

    helper.run([], function() {
      assert.fileContent([
        ['src/coffee/app/views/foo_view.coffee',
          /class FooView extends Backbone.View/],
        ['src/coffee/app/views/foo_view.coffee',
          /(?!'text!templates\/foo\.html')/],
        ['src/coffee/app/views/foo_view.coffee',
          /(?!'app\/models\/foo_model')/]
      ]);
      done();
    });
  });

  it('create view with template and without model, sass and test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:view',
      ['../../view', '../../model'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      model: false,
      tpl: true,
      sass: false,
      test: false
    }, { useDefaults: true });

    helper.run([], function() {
      assert.file([
        'app/templates/foo.html'
      ]);
      assert.fileContent([
        ['src/coffee/app/views/foo_view.coffee',
          /class FooView extends Backbone.View/],
        ['src/coffee/app/views/foo_view.coffee',
          /'text!templates\/foo\.html'/],
        ['src/coffee/app/views/foo_view.coffee',
          /@\$el.html _\.template\( tpl, {  } \)/],
        ['src/coffee/app/views/foo_view.coffee',
          /(?!'app\/models\/foo_model')/]
      ]);
      done();
    });
  });

  it('create view with named template and without model, sass and test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:view',
      ['../../view', '../../model'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      model: false,
      tpl: true,
      tplName: 'my_template',
      sass: false,
      test: false
    }, { useDefaults: true });

    helper.run([], function() {
      assert.file([
        'app/templates/my_template.html'
      ]);
      assert.fileContent([
        ['src/coffee/app/views/foo_view.coffee',
          /class FooView extends Backbone.View/],
        ['src/coffee/app/views/foo_view.coffee',
          /'text!templates\/my_template\.html'/],
        ['src/coffee/app/views/foo_view.coffee',
          /@\$el.html _\.template\( tpl, {  } \)/],
        ['src/coffee/app/views/foo_view.coffee',
          /(?!'app\/models\/foo_model')/]
      ]);
      done();
    });
  });

  it('create view with model and without template, sass and test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:view',
      ['../../view', '../../model'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      model: true,
      tpl: false,
      sass: false,
      test: false
    }, { useDefaults: true });

    helper.run([], function() {
      assert.fileContent([
        ['src/coffee/app/views/foo_view.coffee',
          /class FooView extends Backbone.View/],
        ['src/coffee/app/views/foo_view.coffee',
          /(?!'text!templates\/foo\.html')/],
        ['src/coffee/app/views/foo_view.coffee',
          /'app\/models\/foo_model'/],
        ['src/coffee/app/models/foo_model.coffee',
          /class FooModel extends Backbone.Model/]
      ]);
      done();
    });
  });

  it('create view with named model and without template, sass and test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:view',
      ['../../view', '../../model'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      model: true,
      modelName: 'bar',
      tpl: false,
      sass: false,
      test: false
    }, { useDefaults: true });

    helper.run([], function() {
      assert.fileContent([
        ['src/coffee/app/views/foo_view.coffee',
          /class FooView extends Backbone.View/],
        ['src/coffee/app/views/foo_view.coffee',
          /(?!'text!templates\/foo\.html')/],
        ['src/coffee/app/views/foo_view.coffee',
          /'app\/models\/bar_model'/],
        ['src/coffee/app/models/bar_model.coffee',
          /class BarModel extends Backbone.Model/]
      ]);
      done();
    });
  });

  it('create view with sass and without template, model and test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:view',
      ['../../view', '../../model'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      model: false,
      tpl: false,
      sass: true,
      test: false
    }, { useDefaults: true });

    helper.run([], function() {
      assert.file([
        'src/sass/_foo.sass'
      ]);
      assert.fileContent([
        ['src/coffee/app/views/foo_view.coffee',
          /class FooView extends Backbone.View/],
        ['src/coffee/app/views/foo_view.coffee',
          /(?!'text!templates\/foo\.html')/],
        ['src/coffee/app/views/foo_view.coffee',
          /(?!'app\/models\/foo_model')/],
        ['src/sass/main.sass',
          /@import foo/]
      ]);
      done();
    });
  });

  it('create view with named sass and without template, model and test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:view',
      ['../../view', '../../model'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      model: false,
      tpl: false,
      sass: true,
      sassName: 'my_sass',
      test: false
    }, { useDefaults: true });

    helper.run([], function() {
      assert.file([
        'src/sass/_my_sass.sass'
      ]);
      assert.fileContent([
        ['src/coffee/app/views/foo_view.coffee',
          /class FooView extends Backbone.View/],
        ['src/coffee/app/views/foo_view.coffee',
          /(?!'text!templates\/foo\.html')/],
        ['src/coffee/app/views/foo_view.coffee',
          /(?!'app\/models\/foo_model')/],
        ['src/sass/main.sass',
          /@import my_sass/]
      ]);
      done();
    });
  });


  it('create view with test and without template, model and sass', function (done) {
    var helper = helpers.createGenerator(
      'footguard:view',
      ['../../view', '../../model'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      model: false,
      tpl: false,
      sass: false,
      test: true
    }, { useDefaults: true });

    helper.run([], function() {
      assert.fileContent([
        ['src/coffee/app/views/foo_view.coffee',
          /class FooView extends Backbone.View/],
        ['src/coffee/app/views/foo_view.coffee',
          /(?!'text!templates\/foo\.html')/],
        ['src/coffee/app/views/foo_view.coffee',
          /(?!'app\/models\/foo_model')/],

        ['src/coffee/spec/unit/views/foo_view_spec.coffee',
          /Test Foo View/],
        ['src/coffee/spec/unit/views/foo_view_spec.coffee',
          /define \['app\/views\/foo_view'\], \(Foo\) ->/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /"spec\/unit\/views\/foo_view_spec"/]
      ]);
      done();
    });
  });

  it('create view with template and sass and without model and test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:view',
      ['../../view', '../../model'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      model: false,
      tpl: true,
      sass: true,
      test: false
    }, { useDefaults: true });

    helper.run([], function() {
      assert.file([
        'app/templates/foo.html',
        'src/sass/_foo.sass'
      ]);
      assert.fileContent([
        ['src/coffee/app/views/foo_view.coffee',
          /class FooView extends Backbone.View/],
        ['src/coffee/app/views/foo_view.coffee',
          /'text!templates\/foo\.html'/],
        ['src/coffee/app/views/foo_view.coffee',
          /(?!'app\/models\/foo_model')/],
        ['src/coffee/app/views/foo_view.coffee',
          /@\$el.html _\.template\( tpl, {  } \)/],
        ['src/sass/main.sass', /@import foo/]
      ]);
      done();
    });
  });

  it('create view with template, test and sass and without model', function (done) {
    var helper = helpers.createGenerator(
      'footguard:view',
      ['../../view', '../../model'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      model: false,
      tpl: true,
      sass: true,
      test: true
    }, { useDefaults: true });

    helper.run([], function() {
      assert.file([
        'app/templates/foo.html',
        'src/sass/_foo.sass'
      ]);
      assert.fileContent([
        ['src/coffee/app/views/foo_view.coffee',
          /class FooView extends Backbone.View/],
        ['src/coffee/app/views/foo_view.coffee',
          /'text!templates\/foo\.html'/],
        ['src/coffee/app/views/foo_view.coffee',
          /(?!'app\/models\/foo_model')/],
        ['src/coffee/app/views/foo_view.coffee',
          /@\$el.html _\.template\( tpl, {  } \)/],
        ['src/sass/main.sass',
          /@import foo/],

        ['src/coffee/spec/unit/views/foo_view_spec.coffee',
          /Test Foo View/],
        ['src/coffee/spec/unit/views/foo_view_spec.coffee',
          /define \['app\/views\/foo_view'\], \(Foo\) ->/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /"spec\/unit\/views\/foo_view_spec"/]
      ]);
      done();
    });
  });

  it('create view with template, model and sass and without test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:view',
      ['../../view', '../../model'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      model: true,
      tpl: true,
      sass: true,
      test: false
    }, { useDefaults: true });

    helper.run([], function() {
      assert.file([
        'app/templates/foo.html',
        'src/sass/_foo.sass'
      ]);
      assert.fileContent([
        ['src/coffee/app/views/foo_view.coffee',
          /class FooView extends Backbone.View/],
        ['src/coffee/app/views/foo_view.coffee',
          /'text!templates\/foo\.html'/],
        ['src/coffee/app/views/foo_view.coffee',
          /'app\/models\/foo_model'/],
        ['src/coffee/app/views/foo_view.coffee',
          /@\$el.html _\.template\( tpl, { model: @model } \)/],
        ['src/coffee/app/models/foo_model.coffee',
          /class FooModel extends Backbone.Model/],
        ['src/sass/main.sass', /@import foo/]
      ]);
      done();
    });
  });

  it('create view with template, model, sass and test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:view',
      ['../../view', '../../model'],
      ['foo']
    );

    helpers.mockPrompt(helper, {
      model: true,
      tpl: true,
      sass: true,
      test: true
    }, { useDefaults: true });

    helper.run([], function() {
      assert.file([
        'app/templates/foo.html',
        'src/sass/_foo.sass'
      ]);
      assert.fileContent([
        ['src/coffee/app/views/foo_view.coffee',
          /class FooView extends Backbone.View/],
        ['src/coffee/app/views/foo_view.coffee',
          /'text!templates\/foo\.html'/],
        ['src/coffee/app/views/foo_view.coffee',
          /'app\/models\/foo_model'/],
        ['src/coffee/app/views/foo_view.coffee',
          /@\$el.html _\.template\( tpl, { model: @model } \)/],
        ['src/coffee/app/models/foo_model.coffee',
          /class FooModel extends Backbone.Model/],
        ['src/sass/main.sass', /@import foo/],

        ['src/coffee/spec/unit/views/foo_view_spec.coffee',
          /Test Foo View/],
        ['src/coffee/spec/unit/views/foo_view_spec.coffee',
          /define \['app\/views\/foo_view'\], \(Foo\) ->/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /"spec\/unit\/views\/foo_view_spec"/],

        ['src/coffee/app/models/foo_model.coffee',
          /class FooModel extends Backbone.Model/],
        ['src/coffee/spec/unit/models/foo_model_spec.coffee',
          /Test Foo Model/],
        ['src/coffee/spec/unit/models/foo_model_spec.coffee',
          /define \['app\/models\/foo_model'\], \(Foo\) ->/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /"spec\/unit\/models\/foo_model_spec"/]
      ]);
      done();
    });
  });

  it('create view folder, template, model, sass and test', function (done) {
    var helper = helpers.createGenerator(
      'footguard:view',
      ['../../view', '../../model'],
      ['foo', 'bar']
    );

    helpers.mockPrompt(helper, {
      model: true,
      tpl: true,
      sass: true,
      test: true
    }, { useDefaults: true });

    helper.run([], function() {
      assert.file([
        'app/templates/bar/foo.html',
        'src/sass/bar/_foo.sass'
      ]);
      assert.fileContent([
        ['src/coffee/app/views/bar/foo_view.coffee',
          /class FooView extends Backbone.View/],
        ['src/coffee/app/views/bar/foo_view.coffee',
          /'text!templates\/bar\/foo\.html'/],
        ['src/coffee/app/views/bar/foo_view.coffee',
          /'app\/models\/bar\/foo_model'/],
        ['src/coffee/app/views/bar/foo_view.coffee',
          /@\$el.html _\.template\( tpl, { model: @model } \)/],
        ['src/coffee/app/models/bar/foo_model.coffee',
          /class FooModel extends Backbone.Model/],
        ['src/sass/main.sass',
          /@import bar\/foo/],

        ['src/coffee/spec/unit/views/bar/foo_view_spec.coffee',
          /Test Foo View/],
        ['src/coffee/spec/unit/views/bar/foo_view_spec.coffee',
          /define \['app\/views\/bar\/foo_view'\], \(Foo\) ->/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /"spec\/unit\/views\/bar\/foo_view_spec"/],

        ['src/coffee/app/models/bar/foo_model.coffee',
          /class FooModel extends Backbone.Model/],
        ['src/coffee/spec/unit/models/bar/foo_model_spec.coffee',
          /Test Foo Model/],
        ['src/coffee/spec/unit/models/bar/foo_model_spec.coffee',
          /define \['app\/models\/bar\/foo_model'\], \(Foo\) ->/],
        ['src/coffee/spec/unit/all_unit_tests.coffee',
          /"spec\/unit\/models\/bar\/foo_model_spec"/]
      ]);
      done();
    });
  });
});
