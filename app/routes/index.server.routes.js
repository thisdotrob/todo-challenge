var index = require('../controllers/index.server.controller');

module.exports = function(app) {
  app.route('/').get(index.root);
  app.route('/todos').get(index.list);
  app.route('/new').post(index.create);
};
