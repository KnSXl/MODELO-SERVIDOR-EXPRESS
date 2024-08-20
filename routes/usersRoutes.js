const express = require('express');
const controllers = require('../controllers/usersControllers');
const request = require('../middleware/middleware');

const routes = express.Router();

routes.get('/api/users', controllers.listUsers);
routes.get('/api/users/:id', controllers.getUser);
routes.post('/api/users', request.none(), controllers.addUser);
routes.post('/api/users/upload/:id', request.single('file'), controllers.upload);
routes.put('/api/users/:id', request.none(), controllers.updateUser);
routes.patch('/api/users/:id', request.none(), controllers.partialUpdateUser);
routes.delete('/api/users/:id', controllers.deleteUser);

module.exports = routes;