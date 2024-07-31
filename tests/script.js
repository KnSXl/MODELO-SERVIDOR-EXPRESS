const axios = require('axios')
const FormData = require("form-data");
const fs = require("fs");
const { port, ip } = require('../src/config/config')
const baseURL = `http://${ip}:${port}`;

// Função para listar todos os usuários
const getUsers = async () => {
    try {
        const response = await axios.get(`${baseURL}/users`);
        console.log("Lista de usuários:", response.data);
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
    }
};

// Função para obter um usuário por ID
const getUserById = async (id) => {
    try {
        const response = await axios.get(`${baseURL}/users/${id}`);
        console.log(`Usuário com ID ${id}:`, response.data);
    } catch (error) {
        console.error(`Erro ao obter usuário com ID ${id}:`, error);
    }
};

// Função para adicionar um novo usuário
const addUser = async (user) => {
    try {
        const response = await axios.post(`${baseURL}/users`, user);
        console.log("Usuário adicionado:", response.data);
    } catch (error) {
        console.error("Erro ao adicionar usuário:", error);
    }
};

// Função para fazer upload de arquivos de avatar
const uploadUserFile = async (id, filePath, type) => {
    try {
        const form = new FormData();
        form.append('type', type);
        form.append('file', fs.createReadStream(filePath));

        const response = await axios.post(`${baseURL}/users/upload/${id}`, form, {
            headers: form.getHeaders()
        });

        console.log("Arquivo enviado:", response.data);
    } catch (error) {
        console.error("Erro ao enviar arquivo:", error);
    }
};

// Função para atualizar um usuário (substituindo todos os campos)
const updateUser = async (id, user) => {
    try {
        const response = await axios.put(`${baseURL}/users/${id}`, user);
        console.log("Usuário atualizado:", response.data);
    } catch (error) {
        console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
    }
};

// Função para atualizar parcialmente um usuário
const patchUser = async (id, user) => {
    try {
        const response = await axios.patch(`${baseURL}/users/${id}`, user);
        console.log("Usuário atualizado parcialmente:", response.data);
    } catch (error) {
        console.error(`Erro ao atualizar parcialmente usuário com ID ${id}:`, error);
    }
};

// Função para excluir um usuário
const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${baseURL}/users/${id}`);
        console.log("Usuário excluído:", response.data);
    } catch (error) {
        console.error(`Erro ao excluir usuário com ID ${id}:`, error);
    }
};

// Testes

// 1. getUsers
getUsers();

/* // 2. getUserById
getUserById(1); // Substitua 1 pelo ID do usuário desejado

// 3. addUser
const newUser = {
    name: "Novo Usuário",
    email: "novo@usuario.com",
    password: "senha000"
    // Outros campos necessários
};
addUser(newUser);

// 4. uploadUserFile
const userId = 4; // Substitua 1 pelo ID do usuário desejado
const filePath = "./120.png"; // Substitua pelo caminho do arquivo
const fileType = "profile"; // Substitua pelo tipo "profile" ou "cover"
uploadUserFile(userId, filePath, fileType);

// 5. updateUser
const updatedUserData = {
    name: "Usuário",
    // Outros campos a serem atualizados
};
updateUser(4, updatedUserData);

// 6. patchUser
patchUser(4, updatedUserData);

// 7. deleteUser
deleteUser(4); */