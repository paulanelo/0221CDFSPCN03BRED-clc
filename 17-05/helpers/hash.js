const bcrypt = require('bcrypt');

module.exports.createHash = function (senha) {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(senha, salt);
};

module.exports.compareHash = function (senha, hash) {
  return bcrypt.compareSync(senha, hash);
};
