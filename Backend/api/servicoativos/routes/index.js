const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(path.join(__dirname, 'public')));
/* GET home page. */
router.get('/*', function(req, res, next) {
	const filepath = path.join(__dirname, 'public', 'index.html');
	console.log("Index running");
	console.log(__dirname);
	console.log(filepath);
  res.sendFile(filepath);
  
});

module.exports = router;
