const actions = require('../controllers/actions');
require('../services/smartCard');

module.exports = (app) => {
  app.io.on('connection', (socket) => {
    console.log('Successfully coneected');
    actions(socket);
  });
};
