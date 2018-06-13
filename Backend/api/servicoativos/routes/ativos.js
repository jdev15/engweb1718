const express = require('express');
const router = express.Router();
const jwtprocess = require('./jwtprocess');
const jwtp = new jwtprocess({ secret:'none'});
const path = require('path');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const request = require('request-promise-native');
// Read mongoURL and data from file.
// For now it will be hard coded
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'test';
const collectionName = 'ativos';
const connectionPromise = mongoClient.connect(mongoUrl);
const collection = connectionPromise.then(client => client.db(dbName))
					.then(db => db.collection(collectionName))
					.catch(error => {console.log(error);});
const symbol = connectionPromise.then(client => client.db(dbName))
					.then(db => db.collection('symbols'))
					.catch(error => {console.log(error);});

let numberOfSymbols = 14;


/* Tenho que ter 2 serviços e um gateway ou
	1 serviço com tudo junto
	Em cada pedido seria necessario verificar se existe uma
	chave jwt.
	Se existe e é valido então uso a bd mais atualizada
	Se não existe uso a bd mais antiga.
	Qualquer outro caso não respondo
*/

// Necessario para poder extrair conteudo do body dos POSTS/PUTS e outros. NECESSARIOS
router.use(bodyParser.text());
router.use(bodyParser.json());

function sendErrorMsg(resposta){
	if(resposta){
		resposta.status(500);
		resposta.send("O servidor não esta disponivel");
	}
}

function getSymbols(){
		symbol.then(collection => collection.find({}).toArray())
					 .then(list => {numberOfSymbols = list.length })
					 .catch(error => console.log(error));
		console.log(numberOfSymbols);
}

getSymbols();

function sendLastElementsBDData(res){
	const now = new Date();
	getSymbols();
	collection.then(col => col.find({},{projection:{'_id':0}}).sort({timestamp:-1}).limit(numberOfSymbols).toArray())
					.then(list => { res.send(list) })
					.catch(error => {
						res.status(500);
						res.send("The server don't answer.");
					})
}


// sort 1 = ordena de maneira ascendente (no caso do tempo é do mais velho (primeiro) ao mais recente(ultimo))
// sort -1 = contrario
function sendPreLastElementsBDData(res){
	const now = new Date();
	getSymbols();
	collection.then(col => col.find({},{projection:{'_id':0}}).sort({timestamp:-1}).limit(numberOfSymbols*2).toArray())
					.then(list => { res.send(list.slice(numberOfSymbols)) })
					.catch(error => {
						res.status(500);
						res.send("The server don't answer.");
					})
}

function isConnected(req){
	if( req.headers.authorization ){
		return jwtp.decodeToken(req.headers.authorization) || jwtp.decodeBearerToken(req.headers.authorization);
	}else return false;
}

// A ver, parece que com /:index o / é necessario para fazer match
// get on /api/ativos/
router.get('/', function(req, res, next) {
	//console.log(jwtp);
	console.log(req.params);
	console.log(req.headers.authorization);
	if(isConnected(req))
			sendLastElementsBDData(res);
	else sendPreLastElementsBDData(res);

}
);

// get on /api/ativos/from/
// Recupera os ultimos valores de certos ativos.
// query = sym1,sym2,sym3...
// sort = 1 ou -1
// limit = number
router.get('/from/', function(req,res,next){
	console.log(req.query);
	if(!isConnected(req)false) {
		sendErrorMsg(res);
	}else{
	let symbols = req.query.query.split(',');
	symbols = symbols.map(s => s.toUpperCase());
	console.log(symbols);
	collection.then(col => col.find({"simbolo": { $in: symbols } },{projection:{'_id':0}}).sort({timestamp:-1}).limit(symbols.length).toArray())
					.then(list => { console.log(list);res.send(list); })
					.catch(error => {
						sendErrorMsg(res);
					});
	}
});


router.get('/symbol/',function(req,res,next){
	if( req.query.query){
	const symbols = req.query.query.split(',');
	symbol.then(db => db.find({"simbolo": { $in: symbols } },{projection:{'_id':0}}).toArray())
		  .then(list => res.send(list))
		  .catch(erro => sendErrorMsg(res));
	}else{
		symbol.then(db => db.find({},{projection:{'_id':0}}).toArray())
		  .then(list => res.send(list))
		  .catch(erro => sendErrorMsg(res));
	}
});

module.exports = router;
