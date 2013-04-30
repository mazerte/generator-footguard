/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  grunt = require('grunt'),
  yeoman = require('yeoman-generator'),
  generatorUtil = require('../util.js');

grunt.util._.mixin( require('underscore.inflections') );

module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply(this, arguments);
  this.appname = path.basename(process.cwd());

  this.argument('action', { type: String, required: true });
  this.argument('path', { type: String, required: false });

  this.sourceRoot(path.join(__dirname, './templates'));
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.mockClass = function mockClass() {
	if (this.action == "update" || this.action == "all")
		return;
	console.log('mockClass');
	createMock(this.action);
};

Generator.prototype.updateClass = function updateClass() {
	if (this.action != "update" || !this.path)
		return;
	console.log('updateClass');
	updateMock(this.action);
};

Generator.prototype.mockAll = function mockAll() {
	if (this.action != "all" || this.path)
		return;
	console.log('mockAll');
	walk('src/coffee/app', function(err, results) {
		if (err) throw err;
		for (var i = 0; i < results.length; i++) {	
			createMock(results[i]);
		};
	});
};

Generator.prototype.updateAll = function updateAll() {
	if (this.action != "update" || this.path)
		return;
	console.log('updateAll');
	walk('src/coffee/app', function(err, results) {
		if (err) throw err;
		for (var i = 0; i < results.length; i++) {	
			updateMock(results[i]);
		};
	});
};

function createMock(classpath) {
	console.log('	create mock: ' + classpath);
}

function updateMock(classpath) {
	console.log('	update mock: ' + classpath);
}

var fs = require('fs');
var walk = function(dir, done) {
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) return done(err);
		var i = 0;
		(function next() {
			var file = list[i++];
			if (!file) return done(null, results);
			file = dir + '/' + file;
			fs.stat(file, function(err, stat) {
			if (stat && stat.isDirectory()) {
				walk(file, function(err, res) {
					results = results.concat(res);
					next();
				});
			} else {
				results.push(file);
				next();
			}
			});
		})();
	});
};

// Regex 				  	  nombre de tabulations ⁊
// \r([\t ]{2})([\w_@]+):([ {}()\w_@,]*)->((\s[\t ]{2}[\t]+.*)|(\s(?!.)))+
// $1$2:$3->\r\t\t\treturn @get('fake_$2')\r