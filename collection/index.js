/*jshint latedef:false */
var path = require('path'),
	util = require('util'),
	grunt = require('grunt'),
	ScriptBase = require('../script-base.js'),
	generatorUtil = require('../util.js');

grunt.util._.mixin( require('underscore.inflections') );

module.exports = Generator;

function Generator() {
	ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.askFor = function askFor() {
	var cb = this.async(),
		self = this;

	var modelName = grunt.util._.singularize(this.name);
	var prompts = [{
		name: 'model',
		message: 'Would you like to create associate model (' + modelName + ')?',
		default: 'y/model/N'
	}, {
		name: 'test',
		message: 'Would you like to create associate unit test ?',
		default: 'Y/n'
	}];
  
	this.prompt(prompts, function(props) {		
		self.model = false;
		if( props.model !== "y/model/N" ) {
			if( props.model === "y" ) {
				self.model = grunt.util._.singularize(self.name);
			} else if( !(/^n$/i).test(props.model) ) {
				self.model = props.model;
			}
		}
		
		self.test = (/y/i).test(props.test);
		
		cb();
	});
};

Generator.prototype.createCollectionFiles = function createCollectionFiles() {
	var dest =  path.join(
		'src/coffee/app/collections', 
		this.folder, 
		this.name + '_collection.coffee'
	);
	this.template('collection.coffee', dest);

	if( this.model ) {
		generatorUtil.createModel(this, this.model, this.folder, this.test);
	}
	
	if( this.test ) {
		dest = path.join('collections', this.folder, this.name + '_collection');
		generatorUtil.createTest(this, 'unit', 'collection_spec.coffee', dest);
	}
};
