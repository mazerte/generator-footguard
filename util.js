'use strict';
var path = require('path');
var fs = require('fs');
var ModelGenerator = require('./model/index.js');

module.exports = {
  rewrite: rewrite,
  rewriteFile: rewriteFile,
  createTest: createTest,
  createModel: createModel
};

function rewriteFile (args) {
  args.path = args.path || process.cwd();
  var fullPath = path.join(args.path, args.file);

  args.haystack = fs.readFileSync(fullPath, 'utf8');
  var body = rewrite(args);

  fs.writeFileSync(fullPath, body);
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function rewrite (args) {
  // check if splicable is already in the body text
  var re = new RegExp(args.splicable.map(function (line) {
    return '\s*' + escapeRegExp(line);
  }).join('\n'));
  if (re.test(args.haystack)) {
    return args.haystack;
  }

  var lines = args.haystack.split('\n');

  var otherwiseLineIndex = 0;
  lines.forEach(function (line, i) {
    if (line.indexOf(args.needle) !== -1) {
      otherwiseLineIndex = i;
    }
  });

  var spaces = 0;
  while (lines[otherwiseLineIndex].charAt(spaces) === ' ') {
    spaces += 1;
  }

  var spaceStr = '';
  while ((spaces -= 1) >= 0) {
    spaceStr += ' ';
  }

  lines.splice(otherwiseLineIndex, 0, args.splicable.map(function (line) {
    return spaceStr + line;
  }).join('\n'));

  return lines.join('\n');
}

function createTest(generator, type, template, file) {
    generator.template(template, path.join('src/coffee/spec/', type, file + '_spec.coffee'));

    rewriteFile({
      file: 'src/coffee/spec/' + type + '/all_' + type + '_tests.coffee',
      needle: "# <" + type + "> don't remove this comment",
      splicable: [
        ' "' + path.join('spec/', type, file) + '_spec"'
      ]
    });
}

function createModel(generator, name, folder, test) {
  var mg = new ModelGenerator([
    name, folder
  ], generator.options);
  mg.name = name;
  mg.folder = folder;
  mg.test = test;
  mg.createModelFiles();
}

