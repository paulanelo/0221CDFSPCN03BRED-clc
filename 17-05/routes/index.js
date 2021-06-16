var express = require('express');
const { check } = require('express-validator');
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

router.post(
  '/cadastro',
  [
    check('email')
      .isEmpty()
      .isEmail()
      .isLength({ max: 300 })
      .withMessage('O email inserido é inválidos')
      .bail(),
  ],
  cadastrar
);

router.get('/login', showLogin);

router.post('/login', login);

module.exports = router;
