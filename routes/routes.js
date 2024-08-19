const express = require('express'); //
const controller = require('../controllers/controllers');
const request = require('../middleware/middleware');

const router = express.Router();

router.get('/users', controller.listUsers);
router.get('/users/:id', controller.getUser);
router.post('/users', request.none(), controller.addUser);
router.post('/users/upload/:id', request.single('file'), controller.upload);
router.put('/users/:id', request.none(), controller.updateUser);
router.patch('/users/:id', request.none(), controller.partialUpdateUser);
router.delete('/users/:id', controller.deleteUser);

module.exports = router;