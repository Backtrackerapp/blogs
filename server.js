'use strict';

var express = require('express'),
    request = require('request'),
    ejs = require('ejs'),
    seo = require('mean-seo'),
    port = process.env.PORT || 8080,
    app = express(),
    debug = process.argv[2]==='debug',
    request_url = 'http://floating-gorge-9124.herokuapp.com',
    baseURL = '/dist';

//If debug change the urls
if(debug){
    baseURL = '';
    request_url = 'http://backtrackerdev.herokuapp.com';
}

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

//Set up static path
app.use(express.static(__dirname + baseURL));

function render(res, opts){
    opts = opts || {
        title :         'Backtracker Blogs',
        description :   'Backtrackers Blogging',
        keywords :      '',
        image :         'http://s3-eu-west-1.amazonaws.com/static.backtracker/logo-shadow.png'
    }
    ejs.renderFile(__dirname + baseURL + '/index.ejs', opts, (err, html) => {
        if(err) {
            res.send(err);
        } else {
            res.send(html);
        }
    });
}

if(!debug){
    app.get('/:id', function(req, res){
        request(`${request_url}/api/v2/articles/${req.params.id}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body),
                    opts = {};
                opts.title = result.title;
                opts.description = result.description;
                opts.keywords = result.keywords;
                if(result.cover_image) {
                    opts.image = result.cover_image.ipad;
                } else {
                    opts.image = 'http://s3-eu-west-1.amazonaws.com/static.backtracker/logo-shadow.png';
                }
                render(res, opts);
            } else {
                render(res, null);
            }
        });
    })
}

app.get('*', function(req, res){
    render(res, null);
});

app.listen(port);
console.log("server started on port " + port);
