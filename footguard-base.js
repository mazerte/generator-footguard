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

/////////////
// PROMPTS //
/////////////
Generator.prototype.promptForTest = function promptForTest() {
	return {
		name: 'test',
		message: 'Would you like to create associate unit test ?',
		default: 'Y/n'
	};
};

Generator.prototype.promptForModel = function promptForModel(name) {
	return {
		name: 'model',
		message: 'Would you like to create associate model (' + name + ')?',
		default: 'y/model/N'
	};
};

Generator.prototype.promptForTemplate = function promptForTemplate(name) {
	return {
		name: 'tpl',
		message: 'Would you like to create associate template (' + name + ')?',
		default: 'Y/template/n'
	};
};

Generator.prototype.promptForSass = function promptForSass(name) {
	return {
		name: 'sass',
		message: 'Would you like to create associate sass file (' + name + ')?',
		default: 'Y/sass/n'
	};
};

Generator.prototype.parsePromptsResult = function parsePromptsResult(callback) {
	var self = this;
	return function(props) {
		self.model = false;
		if( props.model !== "y/model/N" ) {
			if( (/^y$/i).test(props.model) ) {
				self.model = self.name;
			} else if( !(/^n$/i).test(props.model) ) {
				self.model = props.model;
			}
		}
		
		var fields = {
			tpl: "Y/template/n",
			sass: "Y/sass/n"
		};
		for(var p in fields) {
			if (fields.hasOwnProperty(p)) {
				self[p] = self.name;
				if( props[p] !== fields[p] ) {
					if( (/^y$/i).test(props[p]) ) {
						self[p] = self.name;
					} else if( (/^n$/i).test(props[p]) ) {
						self[p] = false;
					} else {
						self[p] = props[p];
					}
				}
			}
		}
		
		self.test = (/y/i).test(props.test);

		callback(props);
	};
};


//////////////////
// DESTINATIONS //
//////////////////
Generator.prototype.getElementDest = function getElementDest(type) {
	return path.join(
		'src/coffee/app/' + grunt.util._.pluralize(type),
		this.folder,
		this.name + "_" + type + ".coffee"
	);
};


////////////
// CREATE //
////////////
Generator.prototype.createElementTest = function createElementTest(type) {
	if( this.test ) {
		var folder = grunt.util._.pluralize(type);
		var dest = path.join(folder, this.folder, this.name + '_' + type);
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