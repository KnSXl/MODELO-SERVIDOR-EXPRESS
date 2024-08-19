const express = require('express');
const controllers = require('../controllers/usersControllers');
const request = require('../middleware/middleware');

const routes = express.Router();

routes.get('/users', controllers.listUsers);
routes.get('/users/:id', controllers.getUser);
routes.post('/users', request.none(), controllers.addUser);
routes.post('/users/upload/:id', request.single('file'), controllers.upload);
routes.put('/users/:id', request.none(), controllers.updateUser);
routes.patch('/users/:id', request.none(), controllers.partialUpdateUser);
routes.delete('/users/:id', controllers.deleteUser);

module.exports = routes;