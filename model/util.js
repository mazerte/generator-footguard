var ModelGenerator = require('./index.js');

function create(parent) {
  var mg = new ModelGenerator([
    parent.model, parent.folder
  ], parent.options);
  mg.name = parent.model;
  mg.folder = parent.folder;
  mg.test = parent.test;
  mg.createModelFiles();
}

module.exports = {
	create: create
}