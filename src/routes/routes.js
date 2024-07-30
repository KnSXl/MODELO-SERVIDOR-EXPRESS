const express = require('express');
const multer = require('multer');
const controllers = require('../controllers/controllers');
const upload = require('../middlewares/fileUpload');

const request = multer();
const router = express.Router();

// Rota para listar todos os exemplos
router.get('/', controllers.listExamples);

// Rota para obter um exemplo por ID
router.get('/:id', controllers.getExampleById);

// Rota para adicionar um novo exemplo
router.post('/', request.none(), controllers.addExample);

// Rota para fazer upload de arquivos com o ID do exemplo
router.post('/upload/:id', upload.single('file'), controllers.uploadFile);

// Rota para atualizar um exemplo existente
router.put('/:id', request.none(), controllers.updateExample);

// Rota para atualizar parcialmente um exemplo pelo ID
router.patch('/:id', request.none(), controllers.partialUpdateExample);

// Rota para excluir um exemplo
router.delete('/:id', controllers.deleteExample);

module.exports = router;