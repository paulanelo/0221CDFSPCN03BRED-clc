const candies = require('../jsons/candies.json');

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
  const { password, confirm_password } = req.body;
  // equivale
  // const password = req.body.password;
  // const confirm_password = req.body.confirm_password;
  if (password !== confirm_password) {
    res.render('cadastro', {
      error: {
        senha: 'Senhas incompativeis',
      },
      content: req.body,
    });
  }
  res.send(req.body);
};
