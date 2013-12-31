'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = Generator;

function Generator() {
	yeoman.generators.NamedBase.apply(this, arguments);
	this.appname = path.basename(process.cwd());

	this.argument('folder', { type: String, required: false, defaults: "" });

	this.sourceRoot(path.join(__dirname, './templates'));
}

util.inherits(Generator, yeoman.generators.NamedBase);
