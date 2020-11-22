var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();
var path = require("path");

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://nodejsapp:parkersegal@csce411final.maubt.mongodb.net/Superheroes?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  console.log("connected?");
  if (err) return console.error(err)
  console.log('Connected to Database');
});

router.get('/api/characters/:charName', function(req, res) {
  client.db("Superheroes").collection("Character").find({Name: { '$regex': req.params.charName, '$options': 'i'}}).toArray()
  .then(results => {
    console.log(results);
    res.send(results);
  });
})

router.get('/api/id/:id', function(req, res) {
  const id = new ObjectId(req.params.id);
  client.db("Superheroes").collection("Character").findOne({_id: id})
  .then(results => {
    console.log(results);
    res.send(results);
  });
})

router.get('/api/characters/', function(req, res) {
  client.db("Superheroes").collection("Character").find().toArray()
  .then(results => {
    res.send(results);
  })
})

router.get('/api/haspower/:powerone/:powertwo'), function(req, res) {
  let params = []
  params.push(req.params.powerone);
  if (req.params.powertwo) {
    params.push(req.params.powertwo)
  }
  client.db("Superheroes").collection("Character").countDocuments({ $expr: { Powers: { $all: params}} })
  .then( results => {
    res.send(results);
  })
}

router.get('/api/haspowertwo/:powerone/:powertwo'), function(req, res) {
  let params = []
  params.push(req.params.powerone);
  if (req.params.powertwo) {
    params.push(req.params.powertwo)
  }
  client.db("Superheroes").collection("Character").countDocuments({ Powers: { $all: params}})
  .then( results => {
    res.send(results);
  })
}

router.get('/api/powers', function(req, res) {
  client.db("Superheroes").collection("Character").distinct("Powers")
  .then( results => {
    res.send(results);
  })
})

router.get('/*', function(req, res, next) {
  res.sendFile(__dirname + '/index.html'); 
});

module.exports = router;
