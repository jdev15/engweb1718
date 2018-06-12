const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const sql = require('../common/dbaccess.js');

var db = {};

function getDB(dbConnect) {
  db=dbConnect;
}

router.post('/login', async (req, res) => {
  console.log(db);
  var exit, userExists, pass;
  //verifica se user existe na BD
  await db.getTable('user').select('Email', 'Password')
  .execute((response) =>{
    console.log(response[0].trim());
    if(response[0].trim()===req.body.user) {
      userExists = true;
      pass=response[1].trim();
    }
  }).catch((err) => {
    exit = true;
    res.status(500).json({
      error: 'Error on database query!\n'+err,
    });
  })
  if(exit) return;
  else if(!userExists)
    return res.status(401).json({
      error: 'User doesnt exist in system',
    })
  //verifica se pass introduzida esta correta
  bcrypt.compare(req.body.pass, pass, (err, result) => {
    if(err)
      return res.status(401).json({
        error: 'Invalid Password',
      });
    if(result)
      return res.status(200).json({
        success: 'Authenticated',
      });
    return res.status(401).json({
      error: 'Wrong Password'
    });
  })
});



router.post('/register', async (req, res) => {
  var exit;
  //verifica se user ja existe na BD
  await db.getTable('user').select('Username')
  .execute((result) => {
    //console.log(result[0].trim());
    if(result[0].trim()===req.body.username) {
      exit = true;
      res.status(500).json({
        error: 'User already exists',
      });
    }
  });
  if(exit) return;
  //encripta a pass e adiciona novo user à BD
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    console.log("HASH: "+hash);
    if(err) {
      exit = true;
      res.status(500).json({
        errorHash: err
      });
    }
    if(exit) return;
    else { //insere na BD o user
      await db.getTable('user').insert('Username', 'Email', 'Password',
        'PrimeiroNome', 'UltimoNome', 'Telemovel', 'Plafond')
      .values(req.body.username, req.body.email, hash,
        req.body.fname, req.body.lname, req.body.tlm, "100")
      .execute()
      .catch(error => {
        exit = true;
        res.status(500).json({
          errorDBInsert: error
        });
      });
      if(!exit)
        return res.status(200).json({
          success: 'New user has been created'
        });
    }
  });
});

module.exports = router;
module.exports.getDB = getDB;