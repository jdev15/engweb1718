const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const JWT = require('../common/jwtprocess');

var db = {};
var secret = 'engweb2018';
const token = new JWT({secret: secret});

function getDB(dbConnect) {
  db=dbConnect;
  console.log('Secret: '+token.getSecret()); //test
}


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
          errorDBInsert1: error
        });
      });
      if(exit) return;
      //insere ativos por defeito na watchlist
      await db.getTable('watchlist').insert('CodigoNASDAQ', 'Username')
      .values("MSFT", req.body.username)
      .values("AAPL", req.body.username).execute()
      .catch(err => {
        error=true;
        res.status(500).json({
          errorDBInsert2: err
        });
      });
      if(!exit)
        return res.status(200).json({
          success: 'New user has been created'
        });
    }
  });
});


router.post('/login', async (req, res) => {
  //console.log(db);
  var exit, userExists, userdata;
  //verifica se user existe na BD
  await db.getTable('user').select()
  .execute((response) =>{
    //console.log(response[0].trim());
    if(response[0].trim()===req.body.user) {
      userExists = true;
      pass=response[2].trim();
      var CC = {};
      if(res[6]) CC = res[i+6].trim();
      userdata = {
        email: response[1].trim(),
        fname: response[3].trim(),
        lname: response[4].trim(),
        phone: response[5],
        credit: CC,
        plafond: response[7],
      }
      //console.log(userdata);
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
    if(result) {
      const j = token.createAuthToken(req.body.user);
      //console.log(j);
      return res.status(200).json({
        success: 'Authenticated',
        token: j,
        data: userdata,
      });
    }
    return res.status(401).json({
      error: 'Wrong Password'
    });
  })
});




router.post('/changeprofile', async (req, res) => {
  var exit;
  const decoded = token.decodeToken(req.body.token);
  if(!decoded)
    return res.status(401).json({
      error: 'UnauthorizedAccess',
    });
  const user = decoded.customerId;
  if(!req.body.pass)
    await db.getTable('User').update('Username = "'+user+'"')
    .set('Email', req.body.data.email)
    .set('PrimeiroNome', req.body.data.fname)
    .set('UltimoNome', req.body.data.lname)
    .set('Telemovel', req.body.data.phone).execute()
    .catch(err => {
      exit=true;
      res.status(500).json({
        errorDBInsert: err
      });
    });
  else
    bcrypt.hash(req.body.pass, 10, async (err, hash) => {
      if(err) {
        exit = true;
        res.status(500).json({
          errorHash: err
        });
      }
      if(exit) return;
      else{
        await db.getTable('User').update('Username = "'+user+'"')
        .set('Email', req.body.data.email)
        .set('Password', hash)
        .set('PrimeiroNome', req.body.data.fname)
        .set('UltimoNome', req.body.data.lname)
        .set('Telemovel', req.body.data.phone).execute()
        .catch(err => {
          exit=true;
          res.status(500).json({
            errorDBInsert: err
          });
        });
      }
    });
  if(!exit)
    return res.status(200).json({
      success: 'Updated Profile!',
    });
});



router.post('/addplafond', async (req, res) => {
  var exit;
  const decoded = token.decodeToken(req.body.token);
  if(!decoded)
    return res.status(401).json({
      error: 'UnauthorizedAccess',
    });
  const user = decoded.customerId;
  await db.getTable('User').update('Username = "'+user+'"')
  .set('Plafond', req.body.plafond).execute()
  .catch(err => {
    exit = true;
    res.status(500).json({
      errorDBInsert: err
    });
  });
  if(exit) return;
  return res.status(200).json({
    success: 'Updated Plafond!',
  });
})

module.exports = router;
module.exports.getDB = getDB;