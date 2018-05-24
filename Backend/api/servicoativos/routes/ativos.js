const express = require('express');
const router = express.Router();
const jwtprocess = require('./jwtprocess');const path = require('path');
const jwtp = new jwtprocess({ secret:'none'});
const bodyParser = require('body-parser');
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

// A ver, parece que com /:index o / é necessario para fazer match
router.get('/:index', function(req, res, next) {
	//console.log(jwtp);
		console.log(req.params);
	//console.log(module);
	res.sendFile(path.join(__dirname, 'index.html'));

}
);

router.post('/', function(req,res,next){
	console.log(req.payload);
	console.log(req.body);
	res.send( `I received these headers <br/> ${JSON.stringify(req.headers)} <br/><h2> And this body </h2> ${JSON.stringify(req.body)}`);
});

module.exports = router;
