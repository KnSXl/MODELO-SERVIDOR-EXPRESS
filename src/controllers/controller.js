const fs = require('fs'); // Importa o módulo fs para manipulação de arquivos
const database = require('../data/database.json'); // Importa o arquivo JSON que contém os dados do banco de dados
const { port } = require('../config/config') // Importa a configuração da porta para uploads

// Função para listar todos os usuários
const listUser = (req, res) => {
    res.json(database.users);
};

// Função para obter um usuário específico pelo ID
const getUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const usuario = database.users.data.find(user => user.id === userId);
    if (!usuario) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(usuario);
    }
};

// Função para adicionar um novo usuário
const addUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "request: name, email, password" });
    }
    const novoUsuario = {
        id: database.users.data.length + 1,
        name,
        email, 
        password,
        profile_picture: "",
        cover_picture: ""
    };    

    database.users.data.push(novoUsuario);
    atualizarDatabase();
    res.status(201).json(novoUsuario);
};

// Função para fazer upload de uma foto de perfil ou capa para um usuário
const upload = (req, res) => {
    const userId = parseInt(req.params.id);
    const usuario = database.users.data.find(user => user.id === userId);
    const type = req.body.type;

    if (!usuario) {
        res.status(404).json({ message: 'User not found' });
    } else {
        const folderName = type === 'profile' ? 'profile_picture' : 'cover_picture';
        usuario[folderName] = `http://localhost:${port}/uploads/${userId}/${folderName}/${req.file.filename}`;
        atualizarDatabase();
        res.json({ message: `${type === 'profile' ? 'Profile' : 'Cover'} picture successfully updated` });
    }
};

// Função para atualizar todos os dados de um usuário pelo ID
const updateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const index = database.users.data.findIndex(user => user.id === userId);

    if (index === -1) {
        res.status(404).json({ message: 'User not found' });
    } else {
        database.users.data[index] = { id: userId, ...req.body };
        atualizarDatabase();
        res.json(database.users.data[index]);
    }
};

// Função para atualizar parcialmente os dados de um usuário pelo ID
const partialUpdateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const index = database.users.data.findIndex(user => user.id === userId);

    if (index === -1) {
        res.status(404).json({ message: 'User not found' });
    } else {
        database.users.data[index] = { id: userId, ...database.users.data[index], ...req.body };
        atualizarDatabase();
        res.json(database.users.data[index]);
    }
};

// Função para deletar um usuário pelo ID
const deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const index = database.users.data.findIndex(user => user.id === userId);
    if (index === -1) {
        res.status(404).json({ message: 'User not found' });
    } else {
        database.users.data.splice(index, 1);
        atualizarDatabase();
        res.json({ message: 'User deleted successfully' });
    }
};

// Função para atualizar o arquivo JSON com os dados do banco de dados
const atualizarDatabase = () => {
    fs.writeFileSync(__dirname + '/../data/database.json', JSON.stringify(database, null, 2));
};

// Exporta as funções para uso em outros módulos
module.exports = {
    listUser,
    getUser,
    addUser,
    upload,
    updateUser,
    partialUpdateUser,
    deleteUser
};