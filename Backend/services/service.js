const path = require('path');
const mongoClient = require('mongodb').MongoClient;
const request = require('request-promise-native');
// Read mongoURL and data from file.
// For now it will be hard coded
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'test';
const collectionName = ['ativos','symbols'];
const connectionPromise = mongoClient.connect(mongoUrl);
const client = connectionPromise.then(client => client.db(dbName));
const ativos = client
					.then(db => db.collection(collectionName[0]))
					.catch(error => {console.log(error);});
const symbol = client
					.then(db => db.collection(collectionName[1]))
					.catch(error => {console.log(error);});

const timer = Number( process.env.TIMER_TIME || '60') * 1000; // milliseconds

function getSymbols(){
		return symbol.then( collection => collection.find({}).toArray())
					.then( list => list.map(b => b.name))
			  		.then( list => { return list;});
}


function isMarketOpen(){
	// Para a API abre as 9:30 AM e fecha as 16:00 PM
	const date = new Date();
	// between 9:30 AM and 16h the market is Open
	//console.log(date.toISOString());
	if( date.getUTCDay() === 0 || date.getUTCDay() === 6)
			return false; // mercado fechado sabado e domingo.
	if( (date.getUTCHours() - 4)*60+date.getUTCMinutes() >= 570  &&  date.getUTCHours() - 4 < 16)
			return true;
	else // if it's 16:00 the market just closed but we stil have one value left so true
		 if( date.getUTCHours() - 4 === 16 && date.getUTCMinutes() === 00)
		 	return true;
	else // for other hours the market is closed
			return false;
}


function calculatePercentageVariation(passado,presente){
	return ((presente-passado)/( (presente+passado) /2) ) * 100;
}


//calcula variancia 1h
function variancia1h(data,indice){
	const elementValue = data[indice].close;
	if( indice < 60){
		return elementValue - data[0].marketOpen;
	}else return elementValue - data[indice-60].marketClose;
}

function variancia4h(data,indice){
	const elementValue = data[indice].close;
	if( indice < 240){
		return elementValue - data[0].marketOpen;
	}else return elementValue - data[indice-240].marketClose;
}

function diaAnterior(date){
	let diaanterior = new Date(date);
	if( date.getUTCDay() === 1){// Segunda
		diaanterior.setUTCDate(date.getUTCDate()-3);
		// Segunda -> Domingo -> Sabado -> Sexta
	}else diaanterior.setUTCDate(date.getUTCDate()-1);
	return diaanterior;
}

function createAPIDate(date){
	let day;
	if(date.getUTCMonth() + 1 < 10)
		day = `${date.getUTCFullYear()}0${date.getUTCMonth()+1}`;
	else day = `${date.getUTCFullYear()}${date.getUTCMonth()+1}`;
	if( date.getUTCDate() < 10)
		day = day + `0${date.getUTCDate()}`;
	else day = day + `${date.getUTCDate()}`;
	return day;
}

function goToAPI(date,indice,symbol){
	const day = createAPIDate(date);
		//console.log(`https://api.iextrading.com/1.0/stock/${symbol.symbol}/chart/date/${day}`);
		return request({
        			url: `https://api.iextrading.com/1.0/stock/${symbol.symbol}/chart/date/${day}`, //${present_day}
       	 			json: true,
    	})
    	.then(response =>{ /*console.log(response);*/ return response[indice].marketClose;});
}

// Problema como se faz?? Verifico que existe na bd ou faço pedidos??
// Se não esta na BD, tenho que fazer pedido.
function variancia1d(diatemporal,indice,symbol){
	const diaanterior = diaAnterior(diatemporal);
	//console.log(diaanterior);
	const dia = { date:`${diaanterior.getUTCDate()}-${diaanterior.getUTCMonth()+1}-${diaanterior.getUTCFullYear()}`,
				  time: `${diaanterior.getUTCHours()}:${diaanterior.getUTCMinutes()}`};

	let value = ativos.then(collection => collection.find({datetime: dia}).toArray())
					 .catch(error => console.log(error));

	return value.then( valor => { if( valor.length === 0) {
								return goToAPI(diaanterior, indice, symbol);
							}else return new Promise((a,b) => a(valor.preco_de_venda));
				});
}

function getLast(data){
	if( data.length > 1){
		return data[data.length-1];
	} else return data[0];
}

function calculaIndice(date){
	// 14:30 até 21h UTC
	// 9:30 até 16h
	return (date.getUTCHours() * 60 + date.getUTCMinutes()) - 870;
}

function processElement(data,date,symbol){
	// No maximo são 390 registos. Transformar a minha hora em um indice.
	// 
	const indice = calculaIndice(date);
	if( indice < 0 || indice > 390) // fora das horas
		return; // Não se calcula cenas fora das horas para não dar problemas na BD
	
	const last = getLast(data);
	//console.log(last);
	// Uma vez o elemento tenho que processa-lo.

	// Tenho um indice entre 0 e 390, sendo que 390 corresponde ao fecho do mercado,
	// correspondendo ao valor de fecho presente em 389.
		// a variancia de 1d pode ser feita usando a bd (caso existe valores para o dia anterior)
		// ou fazendo mais um pedido a API...
		const variacao1d = variancia1d( date, indice,symbol);
		const value = variacao1d.then(valor =>  new Promise((a,b) => a({
							nome: symbol.name,
							simbolo: symbol.symbol,
							preco_de_venda: last.close,
							preco_de_compra: last.close * 1.03,
							variacaos: {
											d1: last.close - valor,
											h4: variancia4h(data, indice),
											h1: variancia1h(data, indice)
							},
							datetime: {	// dia-mes-ano e hh-mm os segundos (no nosso caso) não são tão importantes
											date:`${date.getUTCDate()}-${date.getUTCMonth()+1}-${date.getUTCFullYear()}`,
					 						time: `${date.getUTCHours()}:${date.getUTCMinutes()}`
					 				  },
					 		timestamp: date.valueOf()
							})  ));
	 	return value;
}


function variancia1h2(data,indice,value){


	if( indice < 60){
		return calculatePercentageVariation((data[0].marketOpen ? data[0].marketOpen : data[0].close),value );
		//return  value - data[0].marketOpen;
	}else //return value - data[indice-60].marketClose;
		 return calculatePercentageVariation((data[indice-60].marketOpen ? data[indice-60].marketOpen : data[indice-60].close),value )
}

function variancia4h2(data,indice,value){
	if( indice < 240){
		return calculatePercentageVariation((data[0].marketOpen ? data[0].marketOpen : data[0].close),value );
		//return value - data[0].marketOpen;
	}else //return value - data[indice-240].marketClose;
		return calculatePercentageVariation((data[indice-240].marketOpen ? data[indice-240].marketOpen : data[indice-240].close),value );
}

function processElement2(dados,adata){
	// dados tem: a quote (com o simbolo dentro)
	// 			  a chart (os valores do dia)
	let value;
	const indice = calculaIndice(adata);
	console.log(indice);
	if( indice < 0 || indice > 390) // fora das horas
		return; // Não se calcula cenas fora das horas para não dar problemas na BD
	const preco = dados.quote.latestPrice ? dados.quote.latestPrice: dados.quote.close;	
	if( indice === 0 || indice === 390){
			// nos limites usa-se o quote só !!
			console.log("hello");
			let variacao1d;
			if( indice === 390) variacao1d = variancia1d( adata, indice-1,dados.quote);
			else variacao1d = variancia1d( adata, indice,dados.quote);
			value = variacao1d.then(valor =>  new Promise((a,b) => a({
							nome: dados.quote.companyName,
							simbolo: dados.quote.symbol,
							preco_de_venda: preco,
							preco_de_compra: preco * 1.03,
							variacaos: {
											d1: preco - valor,
											h4: variancia4h2(dados.chart, indice,dados.quote.latestPrice),
											h1: variancia1h2(dados.chart, indice,dados.quote.latestPrice)
							},
							datetime: {	// dia-mes-ano e hh-mm os segundos (no nosso caso) não são tão importantes
											date:`${adata.getUTCDate()}-${adata.getUTCMonth()+1}-${adata.getUTCFullYear()}`,
					 						time: `${adata.getUTCHours()}:${adata.getUTCMinutes()}`
					 				  },
					 		timestamp: adata.valueOf()
							})  ));

	}else { // de resto pode se usar o quote para o preço de venda e compra.
		const variacao1d = variancia1d(adata, indice,dados.quote);
		value = variacao1d.then(valor =>  new Promise((a,b) => a({
							nome: dados.quote.companyName,
							simbolo: dados.quote.symbol,
							preco_de_venda: preco ,
							preco_de_compra: preco* 1.03,
							variacaos: {
											d1: preco - valor,
											h4: variancia4h2(dados.chart, indice,dados.quote.latestPrice),
											h1: variancia1h2(dados.chart, indice,dados.quote.latestPrice)
							},
							datetime: {	// dia-mes-ano e hh-mm os segundos (no nosso caso) não são tão importantes
											date:`${adata.getUTCDate()}-${adata.getUTCMonth()+1}-${adata.getUTCFullYear()}`,
					 						time: `${adata.getUTCHours()}:${adata.getUTCMinutes()}`
					 				  },
					 		timestamp: adata.valueOf()
							})  ));
	}
	 	return value;
}


//Batch request getting quote + chart
function recoverDataFromIEXDB2(symbols,date){
	let simbols = [];
	let lista = "";
	symbols.forEach(s =>{ simbols.push(s.symbol); lista= lista + s.symbol + ','});
	console.log(lista);
	// Agora que eu tenho ambos posso processar.
	return  request({
	        			url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${lista}&types=quote,chart&range=1d`, 
	        			json: true /* Esta request da-me a quote e o chart no dia, para cada simbolo*/ 
	        		}).then(response => simbols.map( simbolo => processElement2(response[simbolo],date) ))
	        		  .catch(error => console.log(error))
    				;
}

// 1 request de cada vez para cada um deles, chart
function recoverDataFromIEXDB(symbols,date){
	// recupero os ultimos dados para a minha lista de simbolos
	// calculo as varianças para 1D, 4H e 1H para os meus simbolos.
	//  Guardo as varianças na BD ?
	//const date = new Date();
	//console.log(symbols);
	const present_day = createAPIDate(date);
	// testar com https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,chart&range=1d&chartLast=2
	// para recuperar mais do que um simbolo de cada vez.
	// A ver o que acontece se fazer pedidos as 16h USA (21H PT) e as 9h30 USA (14:30PT)

	return Promise.all(symbols.map( symbol => 	request({
	        								url: `https://api.iextrading.com/1.0/stock/${symbol.symbol}/chart/date/${present_day}`, 
	        						    	json: true 
	        						    }).then(response => processElement(response,date,symbol) ).catch(error => console.log(error))
								
    				 ));
}


function updateDB(){
	if( !isMarketOpen()) return;
	const date = new Date();
	symbol.then( db => db.find({}).toArray())
		  .then(symbols => recoverDataFromIEXDB(symbols,date))
		  .then( novosdados => ativos.then(db => db.insertMany(novosdados)))
		  .then( answer => {console.log("Inserted"); console.log(answer)})
		  .catch(error => console.log(error));
}

function updateDB2(){
	if( !isMarketOpen()) return;
	const date = new Date();
	symbol.then( db => db.find({}).toArray())
		  .then(symbols => recoverDataFromIEXDB2(symbols,date))
		  .then( d => Promise.all(d))
		  .then( novosdados => ativos.then(db => db.insertMany(novosdados)))
		  .then( answer => {console.log("Inserted"); console.log(answer)})
		  .catch(error => console.log(error));
}


setInterval(() =>console.log(updateDB2()) , timer)
//console.log(isMarketOpen());
updateDB2();