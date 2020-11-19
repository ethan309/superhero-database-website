var express = require('express');
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
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html'); 
});

router.get('/characters/:charName', function(req, res) {
  let result;
  result = client.db("Superheroes").collection("Character").find({Name: { '$regex': req.params.charName, '$options': 'i'}}).toArray()
  .then(results => {
    console.log(results);
    res.send(results);
  });
})

module.exports = router;
