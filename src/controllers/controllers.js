const database = require('../data/database.json');
const { atualizarDatabase } = require('../utils/databaseUtils');
const { port } = require('../config/config')

// Exporta uma função para listar todos os exemplos
exports.listExamples = (req, res) => {
    res.json(database.examples);
};

// Exporta uma função para obter um exemplo específico pelo ID
exports.getExampleById = (req, res) => {
    const exampleId = parseInt(req.params.id);
    const example = database.examples.data.find(item => item.id === exampleId);
    if (!example) {
        res.status(404).json({ message: 'Example not found' });
    } else {
        res.json(example);
    }
};

// Exporta uma função para adicionar um novo exemplo
exports.addExample = (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "request: name, description" });
    }
    const newExample = {
        id: database.examples.data.length + 1,
        name,
        description,
    };

    database.examples.data.push(newExample);
    atualizarDatabase(); // Atualiza o banco de dados após adicionar o novo exemplo
    res.status(201).json(newExample);
};

// Exporta uma função para fazer upload de arquivos associados a um exemplo
exports.uploadFile = (req, res) => {
    const exampleId = parseInt(req.params.id);
    const example = database.examples.data.find(item => item.id === exampleId);
    const type = req.body.type;

    if (!example) {
        res.status(404).json({ message: 'Example not found' });
    } else {
        const folderName = type === 'primary' ? 'primary_picture' : 'secondary_image';
        example[folderName] = `http://localhost:${port}/uploads/${exampleId}/${folderName}/${req.file.filename}`;
        atualizarDatabase(); // Atualiza o banco de dados após o upload do arquivo
        res.json({ message: `${type === 'primary' ? 'Primary' : 'Secondary'} picture successfully updated` });
    }
};

// Exporta uma função para atualizar um exemplo completamente
exports.updateExample = (req, res) => {
    const exampleId = parseInt(req.params.id);
    const index = database.examples.data.findIndex(item => item.id === exampleId);

    if (index === -1) {
        res.status(404).json({ message: 'Example not found' });
    } else {
        database.examples.data[index] = { id: exampleId, ...req.body };
        atualizarDatabase(); // Atualiza o banco de dados após a atualização completa
        res.json(database.examples.data[index]);
    }
};

// Exporta uma função para atualizar parcialmente um exemplo
exports.partialUpdateExample = (req, res) => {
    const exampleId = parseInt(req.params.id);
    const index = database.examples.data.findIndex(item => item.id === exampleId);

    if (index === -1) {
        res.status(404).json({ message: 'Example not found' });
    } else {
        database.examples.data[index] = { id: exampleId, ...database.examples.data[index], ...req.body };
        atualizarDatabase(); // Atualiza o banco de dados após a atualização parcial
        res.json(database.examples.data[index]);
    }
};

// Exporta uma função para deletar um exemplo
exports.deleteExample = (req, res) => {
    const exampleId = parseInt(req.params.id);
    const index = database.examples.data.findIndex(item => item.id === exampleId);
    if (index === -1) {
        res.status(404).json({ message: 'Example not found' });
    } else {
        database.examples.data.splice(index, 1);
        atualizarDatabase(); // Atualiza o banco de dados após a exclusão
        res.json({ message: 'Example deleted successfully' });
    }
};