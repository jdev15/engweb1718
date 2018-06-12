const express = require('express');
const cors = require('cors');
const mysqlx = require('@mysql/xdevapi');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const config = {
  user: 'root',
  password: '',
  host: 'localhost',
  port: 33060,
  schema: 'eotp'
};

var db={};

async function connectDB() {
  let session;
  try{
    session = await mysqlx.getSession(config);
    db = await session.getSchema(config.schema);
    console.log(session.inspect(), db);
  }
  catch (err) {
    console.error('ERROR: '+err.message);
  }
}

app.listen(4000, () => {
  connectDB();
  console.log('Listening on port 4000');
});

app.get('/', (req, res) => {
  res.send('Bem-vindo à backend EOTP');
});

app.get('/users', async (req, res) => {
  var values = [];
  await db.getTable('user').select().execute((res)=>{
    for(i=0; i<res.length; i++) {
      values.push({
        username: res[i++].trim(),
        email: res[i++].trim(),
        password: res[i++].trim(),
        firstName: res[i++].trim(),
        lastName: res[i++].trim(),
        phoneNum: res[i++],
        creditCard: res[i++].trim(),
        plafond: res[i],
      });
  }
  });
  res.json({
    data: values,
  });
});


app.post('/login', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post('/register', (req, res) => {
  res.json({
    message: 'Registered User!',
  });
});