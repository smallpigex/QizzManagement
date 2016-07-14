'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send("Something broke!");
});

app.use(express.static(__dirname + '/public'));

var router = express.Router();

//TODO API
router.get('/', function (req, res) {
    console.log(path.join(__dirname, 'index.html'));
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.use('/api', router);

app.listen(8888);
console.log("Server has started.");
