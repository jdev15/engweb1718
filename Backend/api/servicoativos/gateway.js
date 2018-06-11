const express = require('express');
const proxy = require('http-proxy-middleware');
const jwtprocess = require('./routes/jwtprocess');
const jwtp = new jwtprocess({ secret:'none'});

const app = express();

function myrouter(req){
	console.log("My router run");
		if( req.headers.authorization ){
				const valid = jwtp.decodeToken(req.headers.authorization) || jwtp.decodeBearerToken(req.headers.authorization);
				if(valid){ return 'http://localhost:3000';
				}else res.send();
		}else {
			console.log('http://localhost:3001');
			return 'http://localhost:3000';
		}/**/
		//return 'http://localhost:3000';
}


app.use('/api/ativos', proxy('http://localhost:3000/api/ativos', { router: myrouter, changeOrigin: true }));
												

app.listen(9000, () => console.log('Example app listening on port 9000!'));