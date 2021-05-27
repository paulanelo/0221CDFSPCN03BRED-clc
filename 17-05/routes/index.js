var express = require('express');
const app = require('../app');
var router = express.Router();

const {
  showHome,
  showNew,
  showCadastro,
  cadastrar,
  showLogin,
  login,
} = require('../controllers/IndexController');

const checkSession = require('../middlewares/checkSession');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', user: null });
});

router.get('/home', checkSession, showHome);

router.get('/new', showNew);

router.get('/cadastro', showCadastro);

router.post('/cadastro', cadastrar);

router.get('/login', showLogin);

router.post('/login', login);

module.exports = router;
