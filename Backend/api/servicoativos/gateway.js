const express = require('express');
const proxy = require('http-proxy-middleware');
const jwtprocess = require('./routes/jwtprocess');
const jwtp = new jwtprocess({ secret:'none'});

const app = express();

function isConnected(req){
	if( req.headers.authorization ){
		return jwtp.decodeToken(req.headers.authorization) || jwtp.decodeBearerToken(req.headers.authorization);
	}else return false;
}



function myrouter(req){
	console.log("My gateway run");
	if( isConnected(req))  return 'http://localhost:4500';
	else{
			console.log('http://localhost:4501');
			return 'http://localhost:4500';// muda isto caso adiciona-se outra entrada.
		}
}


app.use('/api/ativos', proxy('http://localhost:4500/api/ativos', { router: myrouter, changeOrigin: true }));
app.on('error', onError);


											

app.listen(9000, () => console.log('Listening on port 9000!'));