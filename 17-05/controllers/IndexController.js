const { v4: uuidV4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const candies = require('../jsons/candies.json');
const users = require('../jsons/users.json');
console.log(`O array é um array? ${Array.isArray(users) ? 'Sim' : 'Não'}`);
const { createHash } = require('../helpers/hash');

const CAMINHO = path.join(__dirname, '..', 'jsons', 'users.json');

module.exports.showHome = function (req, res) {
  res.render('home', {
    doces: candies,
    user: {
      name: 'Maria',
    },
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

  const foundUser = users.find((user) => {
    return user.email === email;
  });

  if (foundUser) {
    res.render('cadastro', {
      error: {
        email: 'Email já cadastrado',
      },
      content: req.body,
    });
  }

  if (password !== confirm_password) {
    res.render('cadastro', {
      error: {
        senha: 'Senhas incompativeis',
      },
      content: req.body,
    });
  }

  const usuario = {
    id: uuidV4(),
    ...req.body,
    password: createHash(password),
  };

  delete usuario.confirm_password;

  users.push(usuario);

  fs.writeFileSync(CAMINHO, JSON.stringify(users));

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
