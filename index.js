var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var assert = require('assert');
var db;
var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'static')));

app.get('/api/bugs/', function(req, res, next) {
	var filter = {};
	if (req.query.priority) {
		filter.priority = req.query.priority;
	}

	if (req.query.status) {
		filter.status = req.query.status;
	}

	db.collection('bugs').find(filter).toArray(function(err, doc) {
		res.json(doc)
	});
});

app.get('/api/bugs/:id', function(req, res, next) {
	var id = new ObjectID(req.params.id);
	db.collection('bugs').findOne({_id: id}, function(err, doc) {
		res.json(doc)
	});
});

app.put('/api/bugs/:id', function(req, res, next) {
	var id = ObjectID(req.params.id);
	db.collection('bugs').updateOne({_id: id}, req.body, function(err, result) {
		db.collection('bugs').find({_id: id}).next(function(err, doc) {
			res.send(doc);
		});
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
