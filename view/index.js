/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  grunt = require('grunt'),
  ScriptBase = require('../script-base.js'),
  generatorUtil = require('../util.js'),
	ModelGenerator = require('../model/index.js');

grunt.util._.mixin( require('underscore.inflections') );

module.exports = Generator;

function Generator() {
  ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.askFor = function askFor (argument) {
	var cb = this.async(),
		self = this;

	// a bit verbose prompt configuration, maybe we can improve that
	// demonstration purpose. Also, probably better to have this in other generator, whose responsability is to ask
	// and fetch all realated bootstrap stuff, that we hook from this generator.
	var prompts = [{
		name: 'model',
		message: 'Would you like to create associate model (' + this.name + ')?',
		default: 'y/model/N',
		warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
	}, {	
		name: 'tpl',
		message: 'Would you like to create associate template (' + this.name + ')?',
		default: 'Y/template/n',
		warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
	}, {
		name: 'sass',
		message: 'Would you like to create associate sass file (' + this.name + ')?',
		default: 'Y/sass/n',
		warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
	}, {
		name: 'test',
		message: 'Would you like to create associate unit test ?',
		default: 'Y/n',
		warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
	}];
  
	this.prompt(prompts, function(props) {
		// manually deal with the response, get back and store the results.
		// We change a bit this way of doing to automatically do this in the self.prompt() method.
		self.model = false;
		if( props.model != "y/model/N" ) {
			if( (/^y$/i).test(props.model) ) {
				self.model = self.name;
			} else if( !(/^n$/i).test(props.model) ) {
				self.model = props.model;
			}
		}
		
		self.tpl = self.name;
		if( props.tpl != "Y/template/n" ) {
			if( (/^y$/i).test(props.tpl) ) {
				self.tpl = self.name;
			} else if( (/^n$/i).test(props.tpl) ) {
				self.tpl = false;
			} else {
				self.tpl = props.tpl;
			}
		}
		
		self.sass = self.name;
		if( props.sass != "Y/template/n" ) {
			if( (/^y$/i).test(props.sass) ) {
				self.sass = self.name;
			} else if( (/^n$/i).test(props.sass) ) {
				self.sass = false;
			} else {
				self.sass = props.sass;
			}
		}
		
		self.test = (/y/i).test(props.test);
		
		// we're done, go through next step
		cb();
	});
}

Generator.prototype.createViewFiles = function createCollectionFiles() {
	//console.log('Model: ' + this.model);
	//console.log('Use unit test: ' + this.test);
	this.template('view.coffee', path.join('src/coffee/app/views', this.folder, this.name + '_view.coffee'));
	
	if( this.model ) {
		var mg = new ModelGenerator([
			this.model, this.folder
		], this.options);
		mg.name = this.model;
		mg.folder = this.folder;
		mg.test = this.test;
		mg.createModelFiles();
	}
	
	if( this.sass ) {
		this.template('view.sass', path.join('src/sass', this.folder, '_' + this.sass + '.sass'));
		
		generatorUtil.rewriteFile({
			file: 'src/sass/main.sass',
			needle: "# <here> don't remove this comment",
			splicable: [
				'@import ' + path.join(this.folder, this.sass)
			]
		});
	}
	
	if( this.tpl ) {
		this.template('view.html', path.join('app/templates', this.folder, this.tpl + '.html'));
	}
	
	if( this.test ) {
		this.template('view_spec.coffee', path.join('src/coffee/spec/unit/views', this.folder, this.name + '_view_spec.coffee'));

		generatorUtil.rewriteFile({
			file: 'src/coffee/spec/unit/all_unit_tests.coffee',
			needle: "# <unit> don't remove this comment",
			splicable: [
				'	"' + path.join('spec/unit/views/', this.folder, this.name + '_view_spec') + '"'
			]
		});
	}
};
