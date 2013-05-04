/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  grunt = require('grunt'),
  yeoman = require('yeoman-generator'),
  mkdirp = require('mkdirp'),
  _ = require('underscore'),
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
	var base = process.cwd();
	var src_path = path.join(base, classpath);
	var dest_path = path.join(base, classpath.replace(/^src\/coffee\/app/, 'src/coffee/spec/fixtures'));
	console.log('	create mock: ' + dest_path);

	src = fs.readFileSync(src_path, 'utf8')
	var regex, tmp;

	// fake all method
	regex = /\n([\t ]{1})([\w_@]+)(:| *= *)([ {}()\w_@,]*)->((\s[\t ]{1}[\t]+.*)|(\s(?!.)))+/g;
	src = src.replace(regex, "\n$1$2$3$4->\n\t\t\treturn @get('fake_$2')\n");
	regex = /\n([\t ]{2})([\w_@]+)(:| *= *)([ {}()\w_@,]*)->((\s[\t ]{2}[\t]+.*)|(\s(?!.)))+/g;
	src = src.replace(regex, "\n$1$2$3$4->\n\t\t\treturn @get('fake_$2')\n");

	// Change class name
	regex = /\n\t(((class *)(\w*))|((\w*)( *= *[\w(), {}]*->)))/g;
	src = src.replace(regex, "\n\t$3$4$6Mock$7");

	// Remove unused dependencies
	regex = /define\(* *\[([\w'"\s-, \/.!]*)]/g;
	tmp = regex.exec(src)[1];
	regex = /["']([\w-\/_.!]*)['"]/g;
	var defines = [];
	while ( match = regex.exec(tmp) ) defines.push(match[1]);

	regex = /define\(* *\[(?:[\w'"\s-, \/.!]*)], *\(([\w,$_\s]*)\) *->/g;
	tmp = regex.exec(src)[1];
	regex = /([a-zA-Z0-9$_]+)/g;
	var requires = [];
	while ( match = regex.exec(tmp) ) requires.push(match[1]);

	defines = _(defines).first(requires.length);
	obj = _.object( requires, defines );
	for(var i = 0; i < requires.length; i++) {
		dep = requires[i];
		if( src.match(new RegExp(dep, 'g')).length < 2 )
			delete obj[dep];
	}
	var newDeps = "define [\n";
	for (var prop in obj) {
		var value = obj[prop];
		newDeps += "\t'" + value + "'\n";
	}
	newDeps += "], (";
	for (var prop in obj) {
		newDeps += prop + ", ";
	}
	newDeps = newDeps.substring(0, newDeps.lastIndexOf(", "));
	newDeps += ")->";
	src = src.replace(/define[.\s\[\]'"\w!\/,()-]*->/g, newDeps);

	console.log(src);
	writeFile(dest_path, src);
}

function writeFile(filepath, content) {
	mkdirp(path.dirname(filepath), function(err) {
		if (err) return console.log("ERROR: " + err);
		fs.writeFileSync(filepath, content);
	});
}

function updateMock(classpath) {
	base = process.cwd()
	src_path = path.join(base, classpath)
	dest_path = path.join(base, classpath.replace(/^src\/coffee\/app/, 'src/coffee/spec/fixtures'))
	console.log('	update mock: ' + dest_path)

	src = fs.readFileSync(src_path, 'utf8')
	dest = fs.readFileSync(src_path, 'utf8')
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

// TODO
// if class if not a backbone model (don't @get('fake_*'))
// rename new Class line if the class is a singleton