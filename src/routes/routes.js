const express = require('express'); // Importa o Express
const controller = require('../controllers/controller'); // Importa o controlador
const request = require('../middleware/multerConfig'); // Importa a configuração do middleware para uploads

const router = express.Router(); // Cria uma instância do roteador Express

// Rota GET para listar todos os usuários
router.get('/users/', controller.listUser);

// Rota GET para obter um usuário específico por ID
router.get('/users/:id', controller.getUser);

// Rota POST para adicionar um novo usuário
router.post('/users/', request.none(), controller.addUser);

// Rota POST para upload de arquivo para um usuário específico
router.post('/users/upload/:id', request.single('file'), controller.upload);

// Rota PUT para atualizar um usuário específico por ID
router.put('/users/:id', request.none(), controller.updateUser);

// Rota PATCH para atualização parcial de um usuário específico por ID
router.patch('/users/:id', request.none(), controller.partialUpdateUser);

// Rota DELETE para remover um usuário específico por ID
router.delete('/users/:id', controller.deleteUser);

module.exports = router; // Exporta o roteador para ser usado em outros arquivos