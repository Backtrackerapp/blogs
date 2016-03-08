var express = require('express'),
    path = require('path'),
    seo = require('mean-seo'),
    port = process.env.PORT || 8080,
    app = express(),
    debug = process.argv[2]==='debug',
    baseURL = '/dist';

if(debug) baseURL = '';

// Enable PhantomJS SEO.
if (process.env.REDISCLOUD_URL) {
  // If we've got Redis available, use that.
  app.use(seo({
    cacheClient: 'redis',
    redisURL: process.env.REDISCLOUD_URL
  }));
} else {
  // Otherwise, use regular disk-based cache.
  app.use(seo());
}

app.use(express.static(__dirname + baseURL));

app.get('*', function(request, response){
    response.sendFile(baseURL+'/index.html' , { root : __dirname});
});

app.listen(port);
console.log("server started on port " + port);
