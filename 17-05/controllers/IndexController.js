const candies = require('../jsons/candies.json');

module.exports.showHome = function (req, res) {
  res.render('home', {
    doces: candies,
    user: {
      name: 'Maria',
    },
  });
};
