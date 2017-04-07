var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var db;
var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'static')));

app.get('/api/bugs', function(req, res, next) {
  db.collection('bugs').find().toArray(function(err, docs){
		res.json(docs);
	});
});

app.post('/api/bugs', function(req, res) {
  db.collection('bugs').insertOne(req.body, function(err, result) {
		assert.equal(null, err);
    db.collection('bugs').find({_id: result.insertedId}).limit(1).next(function(err, doc) {
			assert.equal(null, err);
			res.json(doc);
		});
	});
});


MongoClient.connect('mongodb://localhost/bugsdb', function(err, dbConnection) {
	assert.equal(null, err);
	console.log("connected to dbs");
	db = dbConnection;
	app.listen(3000, function() {
	  console.log('Server has started on port 3000');
	});
});
