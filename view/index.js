/*jshint latedef:false */
var path = require('path'),
	util = require('util'),
	generatorUtil = require('../util.js'),
	FooguardBase = require('../footguard-base.js');

module.exports = Generator;

function Generator() {
	FooguardBase.apply(this, arguments);
}

util.inherits(Generator, FooguardBase);

Generator.prototype.askFor = function askFor() {
	var cb = this.async(),
		self = this;

	var prompts = [{
		name: 'model',
		message: 'Would you like to create associate model (' + this.name + ')?',
		default: 'y/model/N'
	}, {	
		name: 'tpl',
		message: 'Would you like to create associate template (' + this.name + ')?',
		default: 'Y/template/n'
	}, {
		name: 'sass',
		message: 'Would you like to create associate sass file (' + this.name + ')?',
		default: 'Y/sass/n'
	}, this.promptForTest()];
  
	this.prompt(prompts, function(props) {
		self.model = false;
		if( props.model !== "y/model/N" ) {
			if( (/^y$/i).test(props.model) ) {
				self.model = self.name;
			} else if( !(/^n$/i).test(props.model) ) {
				self.model = props.model;
			}
		}
		
		self.tpl = self.name;
		if( props.tpl !== "Y/template/n" ) {
			if( (/^y$/i).test(props.tpl) ) {
				self.tpl = self.name;
			} else if( (/^n$/i).test(props.tpl) ) {
				self.tpl = false;
			} else {
				self.tpl = props.tpl;
			}
		}
		
		self.sass = self.name;
		if( props.sass !== "Y/template/n" ) {
			if( (/^y$/i).test(props.sass) ) {
				self.sass = self.name;
			} else if( (/^n$/i).test(props.sass) ) {
				self.sass = false;
			} else {
				self.sass = props.sass;
			}
		}
		
		self.test = (/y/i).test(props.test);
		
		cb();
	});
};

Generator.prototype.createViewFiles = function createViewFiles() {
	var dest;

	this.template('view.coffee', this.getElementDest('view'));
	
	this.createModel();
	this.createElementTest('collection');
	
	if( this.sass ) {
		dest = path.join('src/sass', this.folder, '_' + this.sass + '.sass');
		this.template('view.sass', dest);
		
		generatorUtil.rewriteFile({
			file: 'src/sass/main.sass',
			needle: "# <here> don't remove this comment",
			splicable: [
				'@import ' + path.join(this.folder, this.sass)
			]
		});
	}
	
	if( this.tpl ) {
		dest = path.join('app/templates', this.folder, this.tpl + '.html');
		this.template('view.html', dest);
	}
};
