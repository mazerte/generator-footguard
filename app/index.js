'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator() {
	yeoman.generators.Base.apply(this, arguments);
	
	var welcome =
	'\n   ,gggggggggggggg                                                                                     '.red        +
	'\n  dP""""""88""""""                   I8                                                             8I '.red        +
	'\n  Yb,_    88                         I8                                                             8I '.red        +
	'\n   `""    88                      88888888                                                          8I '.red        +
	'\n       ggg88gggg                     I8                                                             8I '.red        +
	'\n          88   8,ggggg,    ,ggggg,   I8        ,gggg,gg  gg      gg    ,gggg,gg   ,gggggg,    ,gggg,8I '.red        +
	'\n          88   dP"  "Y8gggdP"  "Y8gggI8       dP"  "Y8I  I8      8I   dP"  "Y8I   dP""""8I   dP"  "Y8I '.red        +
	'\n    gg,   88  i8\'    ,8I i8\'    ,8I ,I8,     i8\'    ,8I  I8,    ,8I  i8\'    ,8I  ,8\'    8I  i8\'    ,8I '.red  +
	'\n     "Yb,,8P ,d8,   ,d8\',d8,   ,d8\',d88b,   ,d8,   ,d8I ,d8b,  ,d8b,,d8,   ,d8b,,dP     Y8,,d8,   ,d8b,'.red      +
	'\n       "Y8P\' P"Y8888P"  P"Y8888P"  8P""Y8   P"Y8888P"8888P\'"Y88P"`Y8P"Y8888P"`Y88P      `Y8P"Y8888P"`Y8'.red      +
	'\n                                                   ,d8I\'                                               '.red       +
	'\n                                                 ,dP\'8I                                                '.red       +
	'\n                                                ,8"  8I                                                '.red        +
	'\n                                                I8   8I                                                '.red        +
	'\n                                                `8, ,8I                                                '.red        +
	'\n                                                 `Y8P"                                                 '.red        +
	'\n                                                                                                       '.red;
	
	console.log(welcome);
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.setupEnv = function setupEnv() {
	// Copies the contents of the generator `templates`
	// directory into your users new application path
	console.log("".cyan);
	console.log("Install starter's files".cyan);
	console.log("=======================".cyan);
	this.directory('.','.', true);

	this.on('end', function () {
		if (['app', 'footguard'].indexOf(this.generatorName) >= 0) {
			this.installDependencies({ skipInstall: this.options['skip-install'] });
		}
	});
};
