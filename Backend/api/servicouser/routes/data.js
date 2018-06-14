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

router.get('/getwatchlist', async (req, res) => {
  var exit;
  const decoded = token.decodeToken(req.headers.authorization);
  if(!decoded)
    return res.status(401).json({
      error: 'UnauthorizedAccess',
    });
  const user = decoded.customerId;
  var ativos = [];
  await db.getTable('watchlist').select()
  .execute((res)=>{
    if(res[1].trim()===user) {
      ativos.push(res[0].trim());
    }
  })
  .catch((err) => {
    exit = true;
    res.status(500).json({
      error: 'Error on database query!\n'+err,
    });
  })
  if(!exit)
    return res.status(200).json({
      data: ativos,
    });
})

router.get('/getportfolio', async (req, res) => {
  var exit;
  const decoded = token.decodeToken(req.headers.authorization);
  if(!decoded)
    return res.status(401).json({
      error: 'UnauthorizedAccess',
    });
  const user = decoded.customerId;
  var portId;
  var ativos=[];
  await db.getTable('portfolio').select()
  .execute((res)=>{
    if(res[1].trim()===user) {
      portId=res[0];
    }
  })
  .catch(err => {
    exit = true;
    res.status(500).json({
      error: 'Error on database query!\n'+err,
    });
  })
  await db.getTable('ativo').select()
  .execute((res)=>{
    if(res[4]===portId) {
      const ativo = {
        symbol: res[0].trim(),
        units: parseInt(res[1].trim()),
        investment: parseFloat(res[2].trim()),
        value: parseFloat(res[3].trim())
      }
      ativos.push(ativo);
    }
  })
  if(!exit)
    return res.status(200).json({
      data: ativos,
    });
})

router.post('/openpos', async (req, res) => {
  var exit;
  console.log(req.body);
  const decoded = token.decodeToken(req.body.token);
  if(!decoded)
    return res.status(401).json({
      error: 'UnauthorizedAccess',
    });
  const user = decoded.customerId;
  var portId;
  await db.getTable('portfolio').select()
  .execute((res)=>{
    if(res[1].trim()===user) {
      portId=res[0];
    }
  })
  .catch(err => {
    exit = true;
    res.status(500).json({
      errorQuery: err,
    });
  });
  if(exit) return;
  await db.getTable('ativo').insert()
  .values(req.body.name, req.body.units, req.body.invest, req.body.price, portId)
  .execute()
  .catch(error => {
    exit = true;
    res.status(500).json({
      errorDBInsert: error
    });
  });
  if(exit) return;
  await db.getTable('User').update('Username = "'+user+'"')
  .set('Plafond', req.body.plafond)
  .execute()
  .catch(err => {
    exit=true;
    res.status(500).json({
      errorDBUpdate: err
    });
  })
  if(!exit)
    return res.status(200).json({
      success: 'Added investment to user portfolio!',
    });
})


router.get('/gethistorico', async (req, res) => {
  var exit;
  const decoded = token.decodeToken(req.headers.authorization);
  if(!decoded)
    return res.status(401).json({
      error: 'UnauthorizedAccess',
    });
  const user = decoded.customerId;
  var hist = []
  await db.getTable('history').select()
  .execute((res)=>{
    if(res[9].trim()===user) {
      portId=res[0];
      const data = {
        symbol: res[1].trim(),
        investment: parseFloat(res[2].trim()),
        openPrice: parseFloat(res[3].trim()),
        closePrice: parseFloat(res[4].trim()),
        openDate: res[5].trim(),
        closeDate: res[6].trim(),
        gainloss: res[7].trim(),
        percentgl: res[8].trim()
      }
      hist.push(data);
    }
  })
  .catch(err => {
    exit = true;
    res.status(500).json({
      error: 'Error on database query!\n'+err,
    });
  })
  if(!exit)
    return res.status(200).json({
      data: hist,
    });
})


module.exports = router;
module.exports.getDB = getDB;