const database = require('../database/usersDatabase.json');
const { usersPort } = require('../config/usersConfig');
const fs = require('fs');

const listUsers = (req, res) => {
    res.json(database.users);
};

const getUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = database.users.data.find(user => user.id === userId);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(user);
    }
};

const addUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "request: name, email, password" });
    }
    const newUser = {
        id: database.users.data.length + 1,
        name,
        email, 
        password,
        profile_picture: "",
        cover_picture: ""
    };    

    database.users.data.push(newUser);
    updateDatabase();
    res.status(201).json(newUser);
};

const updateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const index = database.users.data.findIndex(user => user.id === userId);

    if (index === -1) {
        res.status(404).json({ message: 'User not found' });
    } else {
        database.users.data[index] = { id: userId, ...req.body };
        updateDatabase();
        res.json(database.users.data[index]);
    }
};

const partialUpdateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const index = database.users.data.findIndex(user => user.id === userId);

    if (index === -1) {
        res.status(404).json({ message: 'User not found' });
    } else {
        database.users.data[index] = { id: userId, ...database.users.data[index], ...req.body };
        updateDatabase();
        res.json(database.users.data[index]);
    }
};

const deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const index = database.users.data.findIndex(user => user.id === userId);
    if (index === -1) {
        res.status(404).json({ message: 'User not found' });
    } else {
        database.users.data.splice(index, 1);
        updateDatabase();
        res.json({ message: 'User deleted successfully' });
    }
};

const upload = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = database.users.data.find(user => user.id === userId);
    const type = req.body.type;

    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        const folderName = type === 'profile' ? 'profile_picture' : 'cover_picture';
        user[folderName] = `http://localhost:${usersPort}/uploads/${userId}/${folderName}/${req.file.filename}`;
        updateDatabase();
        res.json({ message: `${type === 'profile' ? 'Profile' : 'Cover'} picture successfully updated` });
    }
};

const updateDatabase = () => {
    fs.writeFileSync(__dirname + '/../database/usersDatabase.json', JSON.stringify(database, null, 4));
};

module.exports = {
    listUsers,
    getUser,
    addUser,
    updateUser,
    partialUpdateUser,
    deleteUser,
    upload,
};