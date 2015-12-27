var index = require('../controllers/index.server.controller');

module.exports = function(app) {
  app.route('/').get(index.root);
  app.route('/todos').get(index.todos);
  app.route('/new').post(index.new);
  app.route('/delete').post(index.delete);
  app.route('/edit').post(index.edit);
};
