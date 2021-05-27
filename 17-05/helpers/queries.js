module.exports.findUserByEmail = function (email, users) {
  return users.find((user) => {
    return user.email === email;
  });
};

module.exports.find = function (value, lista, chave) {
  return lista.find((item) => {
    return item[chave] === value;
  });
};

// find('Camila Queiroz', alunos, 'name');
// find('115422332', alunos, 'telefone');
// find('paula@paula.com', users, 'email');
