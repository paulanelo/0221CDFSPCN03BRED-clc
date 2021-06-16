const { v4: uuidV4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const candies = require('../jsons/candies.json');
const users = require('../jsons/users.json');
// console.log(`O array é um array? ${Array.isArray(users) ? 'Sim' : 'Não'}`);
const { createHash, compareHash } = require('../helpers/hash');
const { findUserByEmail, find } = require('../helpers/queries');

const CAMINHO = path.join(__dirname, '..', 'jsons', 'users.json');

module.exports.showHome = function (req, res) {
  console.log(req.session);
  res.render('home', {
    doces: candies,
    user: req.session.usuario,
  });
};

module.exports.showNew = function (req, res) {
  res.render('new');
};

module.exports.showCadastro = function (req, res) {
  res.render('cadastro', {
    error: {},
    content: {},
  });
};

module.exports.cadastrar = function (req, res) {
  const { password, confirm_password, email } = req.body;
  // equivale
  // const password = req.body.password;
  // const confirm_password = req.body.confirm_password;

  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    console.log('temos um erro');
  }

  const foundUser = findUserByEmail(email, users);
  console.log(email);

  if (foundUser) {
    res.render('cadastro', {
      error: {
        email: 'Email já cadastrado',
      },
      content: req.body,
    });
    return;
  }

  if (password !== confirm_password) {
    res.render('cadastro', {
      error: {
        senha: 'Senhas incompativeis',
      },
      content: req.body,
    });
    return;
  }

  const usuario = {
    id: uuidV4(),
    ...req.body,
    password: createHash(password),
  };

  delete usuario.confirm_password;

  users.push(usuario);

  fs.writeFileSync(CAMINHO, JSON.stringify(users));

  return res.redirect('/home');
};

module.exports.showLogin = function (req, res) {
  res.render('login');
};

module.exports.login = function (req, res) {
  const { email, password } = req.body;

  const foundUser = find(email, users, 'email');

  if (!foundUser) {
    res.render('login');
  }

  if (!compareHash(password, foundUser.password)) {
    res.render('login');
  }

  req.session.usuario = foundUser;

  res.redirect('/home');
};

// const IndexControler = {
//   showCadastro: function() {}
// }

// module.exports = IndexControler;

// function showCadastro() {}

// module.exports = showCadastro;

// function showCadastro() {}

// module.exports = { showCadastro };
