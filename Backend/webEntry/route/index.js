const express = require('express');
const router = express.Router();
const path = require('path');

// Needed to serve static assets, don't work without that.
router.use(express.static(path.join(__dirname, 'public')));
const filepath = path.join(__dirname, 'public', 'index.html');
/* GET home page, qualquer que seja o URL */
router.get('/*', function(req, res, next) {
  res.sendFile(filepath);
  
});

module.exports = router;
