var express = require('express'),
    path = require('path'),
    port = process.env.PORT || 8080,
    app = express(),
    debug = process.argv[2]==='debug',
    baseURL = '/dist';

if(debug) baseURL = '';

app.use(express.static(__dirname + baseURL));

app.get('*', function(request, response){
    response.sendFile(baseURL+'/index.html' , { root : __dirname});
});

app.listen(port);
console.log("server started on port " + port);
