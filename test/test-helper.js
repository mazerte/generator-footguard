/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');


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
		var helper = helpers.createGenerator('footguard:helper', ['../../helper'], ['foo']);

		helpers.mockPrompt(helper, {
			test: 'n'
		});

		helper.run([], function() {
			helpers.assertFiles([
				['src/coffee/app/helpers/foo_helper.coffee', /Foo = \(\)->/]
			]);
			done();
		});
	});

});