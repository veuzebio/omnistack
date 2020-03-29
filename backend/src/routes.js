const express = require('express');
const routes = express.Router();

const {
  OngController,
  IncidentController,
  ProfileController,
  SessionController
} = require('./controllers');

routes.get('/', (request, response) => {
  return response.send('Hello World');
});

routes.post('/login', SessionController.create);

routes.get('/profile', ProfileController.index);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;
