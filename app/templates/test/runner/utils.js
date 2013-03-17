'use strict';
var path = require('path');
var url = require('url');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet

var port = 35729;

var utils = module.exports;

var getSnippet = function () {
  /*jshint quotmark:false */
  var snippet = [
          "<!-- test snippet -->",
          "<script>",
          "    window.is_test = true;",
          "</script>",
          ""
          ].join('\n');
  return snippet;
};

var getLRSnippet = function () {
  /*jshint quotmark:false */
  var snippet = [
          "<!-- livereload snippet -->",
          "<script>document.write('<script src=\"http://'",
          " + (location.host || 'localhost').split(':')[0]",
          " + ':" + port + "/livereload.js?snipver=1\"><\\/script>')",
          "</script>",
          ""
          ].join('\n');
  return snippet;
};

utils.testSnippet = function testSnippet(req, res, next) {
  var write = res.write;

  var filepath = url.parse(req.url).pathname;
  filepath = filepath.slice(-1) === '/' ? filepath + 'index.html' : filepath;

  if (path.extname( filepath ) !== '.html') {
    return next();
  }

  res.write = function (string, encoding) {
    var body = string instanceof Buffer ? string.toString() : string;
  
    body = body.replace(/<head>/, function (w) {
      return w + getSnippet() + getLRSnippet();
    });

    if (string instanceof Buffer) {
      string = new Buffer(body);
    } else {
      string = body;
    }

    if (!this.headerSent) {
      this.setHeader('content-length', Buffer.byteLength(body));
      this._implicitHeader();
    }

    write.call(res, string, encoding);
  };

  lrSnippet(req, res, next);

  // next();
};
