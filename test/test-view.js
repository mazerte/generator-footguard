/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');


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
		var helper = helpers.createGenerator('footguard:view', ['../../view'], ['foo']);

		helpers.mockPrompt(helper, {
			model: 'n',
			tpl: 'n',
			sass: 'n',
			test: 'n'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/views/foo_view.coffee', /class FooView extends Backbone.View/],
				['src/coffee/app/views/foo_view.coffee', /(?!'text!templates\/foo\.html')/],
				['src/coffee/app/views/foo_view.coffee', /(?!'app\/models\/foo_model')/]
			]);
			done();
		});
	});

	it('create view with template and without model, sass and test', function (done) {
		var helper = helpers.createGenerator('footguard:view', ['../../view'], ['foo']);

		helpers.mockPrompt(helper, {
			model: 'n',
			tpl: 'y',
			sass: 'n',
			test: 'n'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/views/foo_view.coffee', /class FooView extends Backbone.View/],
				['src/coffee/app/views/foo_view.coffee', /'text!templates\/foo\.html'/],
				['src/coffee/app/views/foo_view.coffee', /@\$el.html _\.template\( tpl, {  } \)/],
				['src/coffee/app/views/foo_view.coffee', /(?!'app\/models\/foo_model')/],
				'app/templates/foo.html'
			]);
			done();
		});
	});

	it('create view with named template and without model, sass and test', function (done) {
		var helper = helpers.createGenerator('footguard:view', ['../../view'], ['foo']);

		helpers.mockPrompt(helper, {
			model: 'n',
			tpl: 'my_template',
			sass: 'n',
			test: 'n'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/views/foo_view.coffee', /class FooView extends Backbone.View/],
				['src/coffee/app/views/foo_view.coffee', /'text!templates\/my_template\.html'/],
				['src/coffee/app/views/foo_view.coffee', /@\$el.html _\.template\( tpl, {  } \)/],
				['src/coffee/app/views/foo_view.coffee', /(?!'app\/models\/foo_model')/],
				'app/templates/my_template.html'
			]);
			done();
		});
	});

	it('create view with model and without template, sass and test', function (done) {
		var helper = helpers.createGenerator('footguard:view', ['../../view'], ['foo']);

		helpers.mockPrompt(helper, {
			model: 'y',
			tpl: 'n',
			sass: 'n',
			test: 'n'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/views/foo_view.coffee', /class FooView extends Backbone.View/],
				['src/coffee/app/views/foo_view.coffee', /(?!'text!templates\/foo\.html')/],
				['src/coffee/app/views/foo_view.coffee', /'app\/models\/foo_model'/],
				['src/coffee/app/models/foo_model.coffee', /class FooModel extends Backbone.Model/]
			]);
			done();
		});
	});

	it('create view with named model and without template, sass and test', function (done) {
		var helper = helpers.createGenerator('footguard:view', ['../../view'], ['foo']);

		helpers.mockPrompt(helper, {
			model: 'bar',
			tpl: 'n',
			sass: 'n',
			test: 'n'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/views/foo_view.coffee', /class FooView extends Backbone.View/],
				['src/coffee/app/views/foo_view.coffee', /(?!'text!templates\/foo\.html')/],
				['src/coffee/app/views/foo_view.coffee', /'app\/models\/bar_model'/],
				['src/coffee/app/models/bar_model.coffee', /class BarModel extends Backbone.Model/]
			]);
			done();
		});
	});

	it('create view with sass and without template, model and test', function (done) {
		var helper = helpers.createGenerator('footguard:view', ['../../view'], ['foo']);

		helpers.mockPrompt(helper, {
			model: 'n',
			tpl: 'n',
			sass: 'y',
			test: 'n'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/views/foo_view.coffee', /class FooView extends Backbone.View/],
				['src/coffee/app/views/foo_view.coffee', /(?!'text!templates\/foo\.html')/],
				['src/coffee/app/views/foo_view.coffee', /(?!'app\/models\/foo_model')/],
				'src/sass/_foo.sass',
				['src/sass/main.sass', /@import foo/]
			]);
			done();
		});
	});

	it('create view with named sass and without template, model and test', function (done) {
		var helper = helpers.createGenerator('footguard:view', ['../../view'], ['foo']);

		helpers.mockPrompt(helper, {
			model: 'n',
			tpl: 'n',
			sass: 'my_sass',
			test: 'n'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/views/foo_view.coffee', /class FooView extends Backbone.View/],
				['src/coffee/app/views/foo_view.coffee', /(?!'text!templates\/foo\.html')/],
				['src/coffee/app/views/foo_view.coffee', /(?!'app\/models\/foo_model')/],
				'src/sass/_my_sass.sass',
				['src/sass/main.sass', /@import my_sass/]
			]);
			done();
		});
	});


	it('create view with test and without template, model and sass', function (done) {
		var helper = helpers.createGenerator('footguard:view', ['../../view'], ['foo']);

		helpers.mockPrompt(helper, {
			model: 'n',
			tpl: 'n',
			sass: 'n',
			test: 'y'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/views/foo_view.coffee', /class FooView extends Backbone.View/],
				['src/coffee/app/views/foo_view.coffee', /(?!'text!templates\/foo\.html')/],
				['src/coffee/app/views/foo_view.coffee', /(?!'app\/models\/foo_model')/],

				['src/coffee/spec/unit/views/foo_view_spec.coffee', /Test Foo View/],
				['src/coffee/spec/unit/views/foo_view_spec.coffee', /define \['app\/views\/foo_view'\], \(Foo\)->/],
				['src/coffee/spec/unit/all_unit_tests.coffee', /"spec\/unit\/views\/foo_view_spec"/]
			]);
			done();
		});
	});

	it('create view with template and sass and without model and test', function (done) {
		var helper = helpers.createGenerator('footguard:view', ['../../view'], ['foo']);

		helpers.mockPrompt(helper, {
			model: 'n',
			tpl: 'y',
			sass: 'y',
			test: 'n'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/views/foo_view.coffee', /class FooView extends Backbone.View/],
				['src/coffee/app/views/foo_view.coffee', /'text!templates\/foo\.html'/],
				['src/coffee/app/views/foo_view.coffee', /(?!'app\/models\/foo_model')/],
				['src/coffee/app/views/foo_view.coffee', /@\$el.html _\.template\( tpl, {  } \)/],
				'app/templates/foo.html',
				'src/sass/_foo.sass',
				['src/sass/main.sass', /@import foo/]
			]);
			done();
		});
	});

	it('create view with template, test and sass and without model', function (done) {
		var helper = helpers.createGenerator('footguard:view', ['../../view'], ['foo']);

		helpers.mockPrompt(helper, {
			model: 'n',
			tpl: 'y',
			sass: 'y',
			test: 'y'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/views/foo_view.coffee', /class FooView extends Backbone.View/],
				['src/coffee/app/views/foo_view.coffee', /'text!templates\/foo\.html'/],
				['src/coffee/app/views/foo_view.coffee', /(?!'app\/models\/foo_model')/],
				['src/coffee/app/views/foo_view.coffee', /@\$el.html _\.template\( tpl, {  } \)/],
				'app/templates/foo.html',
				'src/sass/_foo.sass',
				['src/sass/main.sass', /@import foo/],

				['src/coffee/spec/unit/views/foo_view_spec.coffee', /Test Foo View/],
				['src/coffee/spec/unit/views/foo_view_spec.coffee', /define \['app\/views\/foo_view'\], \(Foo\)->/],
				['src/coffee/spec/unit/all_unit_tests.coffee', /"spec\/unit\/views\/foo_view_spec"/]
			]);
			done();
		});
	});

	it('create view with template, model and sass and without test', function (done) {
		var helper = helpers.createGenerator('footguard:view', ['../../view'], ['foo']);

		helpers.mockPrompt(helper, {
			model: 'y',
			tpl: 'y',
			sass: 'y',
			test: 'n'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/views/foo_view.coffee', /class FooView extends Backbone.View/],
				['src/coffee/app/views/foo_view.coffee', /'text!templates\/foo\.html'/],
				['src/coffee/app/views/foo_view.coffee', /'app\/models\/foo_model'/],
				['src/coffee/app/views/foo_view.coffee', /@\$el.html _\.template\( tpl, { model: @model } \)/],
				['src/coffee/app/models/foo_model.coffee', /class FooModel extends Backbone.Model/],
				'app/templates/foo.html',
				'src/sass/_foo.sass',
				['src/sass/main.sass', /@import foo/]
			]);
			done();
		});
	});

	it('create view with template, model, sass and test', function (done) {
		var helper = helpers.createGenerator('footguard:view', ['../../view'], ['foo']);

		helpers.mockPrompt(helper, {
			model: 'y',
			tpl: 'y',
			sass: 'y',
			test: 'y'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/views/foo_view.coffee', /class FooView extends Backbone.View/],
				['src/coffee/app/views/foo_view.coffee', /'text!templates\/foo\.html'/],
				['src/coffee/app/views/foo_view.coffee', /'app\/models\/foo_model'/],
				['src/coffee/app/views/foo_view.coffee', /@\$el.html _\.template\( tpl, { model: @model } \)/],
				['src/coffee/app/models/foo_model.coffee', /class FooModel extends Backbone.Model/],
				'app/templates/foo.html',
				'src/sass/_foo.sass',
				['src/sass/main.sass', /@import foo/],

				['src/coffee/spec/unit/views/foo_view_spec.coffee', /Test Foo View/],
				['src/coffee/spec/unit/views/foo_view_spec.coffee', /define \['app\/views\/foo_view'\], \(Foo\)->/],
				['src/coffee/spec/unit/all_unit_tests.coffee', /"spec\/unit\/views\/foo_view_spec"/],

				['src/coffee/app/models/foo_model.coffee', /class FooModel extends Backbone.Model/],
				['src/coffee/spec/unit/models/foo_model_spec.coffee', /Test Foo Model/],
				['src/coffee/spec/unit/models/foo_model_spec.coffee', /define \['app\/models\/foo_model'\], \(Foo\)->/],
				['src/coffee/spec/unit/all_unit_tests.coffee', /"spec\/unit\/models\/foo_model_spec"/]
			]);
			done();
		});
	});

	it('create view folder, template, model, sass and test', function (done) {
		var helper = helpers.createGenerator('footguard:view', ['../../view'], ['foo', 'bar']);

		helpers.mockPrompt(helper, {
			model: 'y',
			tpl: 'y',
			sass: 'y',
			test: 'y'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/views/bar/foo_view.coffee', /class FooView extends Backbone.View/],
				['src/coffee/app/views/bar/foo_view.coffee', /'text!templates\/bar\/foo\.html'/],
				['src/coffee/app/views/bar/foo_view.coffee', /'app\/models\/bar\/foo_model'/],
				['src/coffee/app/views/bar/foo_view.coffee', /@\$el.html _\.template\( tpl, { model: @model } \)/],
				['src/coffee/app/models/bar/foo_model.coffee', /class FooModel extends Backbone.Model/],
				'app/templates/bar/foo.html',
				'src/sass/bar/_foo.sass',
				['src/sass/main.sass', /@import bar\/foo/],

				['src/coffee/spec/unit/views/bar/foo_view_spec.coffee', /Test Foo View/],
				['src/coffee/spec/unit/views/bar/foo_view_spec.coffee', /define \['app\/views\/bar\/foo_view'\], \(Foo\)->/],
				['src/coffee/spec/unit/all_unit_tests.coffee', /"spec\/unit\/views\/bar\/foo_view_spec"/],
				
				['src/coffee/app/models/bar/foo_model.coffee', /class FooModel extends Backbone.Model/],
				['src/coffee/spec/unit/models/bar/foo_model_spec.coffee', /Test Foo Model/],
				['src/coffee/spec/unit/models/bar/foo_model_spec.coffee', /define \['app\/models\/bar\/foo_model'\], \(Foo\)->/],
				['src/coffee/spec/unit/all_unit_tests.coffee', /"spec\/unit\/models\/bar\/foo_model_spec"/]
			]);
			done();
		});
	});
});