/*jshint latedef:false */
var util = require('util'),
	FootguardBase = require('../footguard-base.js');

module.exports = Generator;

function Generator() {
	FootguardBase.apply(this, arguments);
}

util.inherits(Generator, FootguardBase);

Generator.prototype.askFor = function askFor() {
	var cb = this.async(),
		self = this;

	var modelName = grunt.util._.singularize(this.name);
	var prompts = [{
		name: 'model',
		message: 'Would you like to create associate model (' + modelName + ')?',
		default: 'y/model/N'
	}, this.promptForTest()];
  
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
	this.template('collection.coffee', this.getElementDest('collection'));

	this.createModel();
	this.createElementTest('collection');
};
