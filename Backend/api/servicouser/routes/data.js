const express = require('express');
const router = express.Router();
const JWT = require('../common/jwtprocess');

var db = {};
var secret = 'engweb2018';
const token = new JWT({secret: secret});


function getDB(dbConnect) {
  db=dbConnect;
  console.log('Secret: '+token.getSecret()); //test
}

router.get('/', (req, res) => {
  res.send('Its Working!!');
});

module.exports = router;
module.exports.getDB = getDB;