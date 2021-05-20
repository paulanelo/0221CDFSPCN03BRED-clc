var express = require('express');
var router = express.Router();

const {
  showHome,
  showNew,
  showCadastro,
  cadastrar,
} = require('../controllers/IndexController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', user: null });
});

router.get('/home', showHome);

router.get('/new', showNew);

router.get('/cadastro', showCadastro);

router.post('/cadastrar', cadastrar);

module.exports = router;
