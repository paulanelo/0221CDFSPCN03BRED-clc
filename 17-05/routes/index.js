var express = require('express');
var router = express.Router();

const { showHome } = require('../controllers/IndexController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', user: null });
});

router.get('/home', showHome);

module.exports = router;
