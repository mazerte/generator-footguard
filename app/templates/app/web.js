var gzippo = require('gzippo'),
    express = require('express'),
    app;

app = express.createServer(express.logger());
app.use(gzippo.staticGzip(__dirname));
app.listen(process.env.PORT || 9001);