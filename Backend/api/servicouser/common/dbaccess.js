const mysqlx = require('@mysql/xdevapi');

const config = {
  user: 'root',
  password: '',
  host: 'localhost',
  port: 33060,
  schema: 'eotp'
};

var db = {}

async function connectDB() {
  let session;
  try{
    session = await mysqlx.getSession(config);
    db = await session.getSchema(config.schema);
    //console.log(session.inspect(), db);
  }
  catch (err) {
    console.error('ERROR: '+err.message);
  }
}

function dbAccess() {
  return db;
}


module.exports.connectDB = connectDB;
module.exports.dbAccess = dbAccess;