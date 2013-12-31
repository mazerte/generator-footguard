/*jshint latedef:false */
var path = require('path'),
	util = require('util'),
	grunt = require('grunt'),
	ScriptBase = require('./script-base.js'),
	generatorUtil = require('./util.js'),
	helpers = require('yeoman-generator').test;

grunt.util._.mixin( require('underscore.inflections') );

module.exports = Generator;

function Generator() {
	ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.getElementDest = function getElementDest(type) {
	return path.join(
		'src/coffee/app/' + grunt.util._.pluralize(type),
		this.folder,
		this.name + "_" + type + ".coffee"
	);
};

Generator.prototype.promptForTest = function promptForTest() {
	return {
		name: 'test',
		message: 'Would you like to create associate unit test ?',
		default: 'Y/n'
	};
};

Generator.prototype.createElementTest = function createElementTest(type) {
	if( this.test ) {
		var folder = grunt.util._.pluralize(type);
		dest = path.join(folder, this.folder, this.name + '_' + type);
		this.createTest('unit', type + '_spec.coffee', dest);
	}
};

Generator.prototype.createTest = function createTest(type, template, file) {
	var dest = path.join('src/coffee/spec/', type, file + '_spec.coffee');
	this.template(template, dest);

	generatorUtil.rewriteFile({
		file: 'src/coffee/spec/' + type + '/all_' + type + '_tests.coffee',
		needle: "# <" + type + "> don't remove this comment",
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
			[__dirname + "/model"],
			[name, folder]
		);
		helpers.mockPrompt(mg, {
			test: test ? "y" : "n"
		});
		mg.run();
	}
};