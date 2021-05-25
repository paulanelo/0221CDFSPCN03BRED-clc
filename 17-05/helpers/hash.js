const bcrypt = require('bcrypt');

module.exports.createHash = function (senha) {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(senha, salt);
};
