require('dotenv').load();
require('dotenv').config();
var express = require('express');
var app = express();
var getURL = require('./getPostSignedURL');
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


app.get('/geturl', function(req, res) {
    getURL.generatePresignedURL(req, res)
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});