/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');


describe('Yeoman generator - model', function () {

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

	it('create model without test', function (done) {
		var helper = helpers.createGenerator('footguard:model', ['../../model'], ['foo']);

		helpers.mockPrompt(helper, {
			test: 'n'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/models/foo_model.coffee', /class FooModel extends Backbone.Model/]
			]);
			done();
		});
	});

	it('create model in folder without test', function (done) {
		var helper = helpers.createGenerator('footguard:model', ['../../model'], ['foo', 'boo']);

		helpers.mockPrompt(helper, {
			test: 'n'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/models/boo/foo_model.coffee', /class FooModel extends Backbone.Model/]
			]);
			done();
		});
	});

	it('create model with test', function (done) {
		var helper = helpers.createGenerator('footguard:model', ['../../model'], ['foo']);

		helpers.mockPrompt(helper, {
			test: 'y'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/models/foo_model.coffee', /class FooModel extends Backbone.Model/],
				['src/coffee/spec/unit/models/foo_model_spec.coffee', /Test Foo Model/],
				['src/coffee/spec/unit/models/foo_model_spec.coffee', /define \['app\/models\/foo_model'\], \(Foo\)->/],
				['src/coffee/spec/unit/all_unit_tests.coffee', /"spec\/unit\/models\/foo_model_spec"/]
			]);
			done();
		});
	});

	it('create model in folder with test', function (done) {
		var helper = helpers.createGenerator('footguard:model', ['../../model'], ['foo', 'boo']);

		helpers.mockPrompt(helper, {
			test: 'y'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/models/boo/foo_model.coffee', /class FooModel extends Backbone.Model/],
				['src/coffee/spec/unit/models/boo/foo_model_spec.coffee', /Test Foo Model/],
				['src/coffee/spec/unit/models/boo/foo_model_spec.coffee', /define \['app\/models\/boo\/foo_model'\], \(Foo\)->/],
				['src/coffee/spec/unit/all_unit_tests.coffee', /"spec\/unit\/models\/boo\/foo_model_spec"/]
			]);
			done();
		});
	});

});