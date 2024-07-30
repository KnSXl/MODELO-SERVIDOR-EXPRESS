const database = require('../data/database.json');
const { atualizarDatabase } = require('../utils/databaseUtils');
const { port } = require('../config/config')

exports.listExamples = (req, res) => {
    res.json(database.examples);
};

exports.getExampleById = (req, res) => {
    const exampleId = parseInt(req.params.id);
    const example = database.examples.data.find(item => item.id === exampleId);
    if (!example) {
        res.status(404).json({ message: 'Example not found' });
    } else {
        res.json(example);
    }
};

exports.addExample = (req, res) => {
    const { name, description } = req.body

    if (!name || !description) {
        return res.status(400).json({ message: "request: name, description" })
    }
    const newExample = {
        id: database.examples.data.length + 1,
        name,
        description,
    };

    database.examples.data.push(newExample);
    atualizarDatabase();
    res.status(201).json(newExample);
};

exports.uploadFile = (req, res) => {
    const exampleId = parseInt(req.params.id);
    const example = database.examples.data.find(item => item.id === exampleId);
    const type = req.body.type;

    if (!example) {
        res.status(404).json({ message: 'Example not found' });
    } else {
        const folderName = type === 'primary' ? 'primary_picture' : 'secondary_image';
        example[folderName] = `http://localhost:${port}/uploads/${exampleId}/${folderName}/${req.file.filename}`;
        atualizarDatabase();
        res.json({ message: `${type === 'primary' ? 'Primary' : 'Secondary'} picture successfully updated` });
    }
};

exports.updateExample = (req, res) => {
    const exampleId = parseInt(req.params.id);
    const index = database.examples.data.findIndex(item => item.id === exampleId);

    if (index === -1) {
        res.status(404).json({ message: 'Example not found' });
    } else {
        database.examples.data[index] = { id: exampleId, ...req.body };
        atualizarDatabase();
        res.json(database.examples.data[index]);
    }
};

exports.partialUpdateExample = (req, res) => {
    const exampleId = parseInt(req.params.id);
    const index = database.examples.data.findIndex(item => item.id === exampleId);

    if (index === -1) {
        res.status(404).json({ message: 'Example not found' });
    } else {
        database.examples.data[index] = { id: exampleId, ...database.examples.data[index], ...req.body };
        atualizarDatabase();
        res.json(database.examples.data[index]);
    }
};

exports.deleteExample = (req, res) => {
    const exampleId = parseInt(req.params.id);
    const index = database.examples.data.findIndex(item => item.id === exampleId);
    if (index === -1) {
        res.status(404).json({ message: 'Example not found' });
    } else {
        database.examples.data.splice(index, 1);
        atualizarDatabase();
        res.json({ message: 'Example deleted successfully' });
    }
};