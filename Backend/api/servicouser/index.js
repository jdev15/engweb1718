const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');

const sql = require('./common/dbaccess.js');
const user = require('./routes/user');

const app = express();
var db;

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/user', user); //para aceder aos metodos de user

app.listen(4000, async () => {
  await sql.connectDB();
  db = await sql.dbAccess();
  user.getDB(db); //definir db no modulo user
  console.log('Listening on port 4000');
  console.log(db);
});

app.get('/', (req, res) => {
  res.send('Bem-vindo à backend EOTP');
});

app.get('/users', async (req, res) => {
  var values = [];
  await db.getTable('user').select().execute((res)=>{
    for(i=0; i<res.length; i++) {
      var CC = {};
      if(res[i+6]) CC = res[i+6].trim();
      values.push({
        username: res[i++].trim(),
        email: res[i++].trim(),
        password: res[i++].trim(),
        firstName: res[i++].trim(),
        lastName: res[i++].trim(),
        phoneNum: res[i++],
        creditCard: CC,
        plafond: res[++i],
      });
  }
  });
  res.json({
    data: values,
  });
});