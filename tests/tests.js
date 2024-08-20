const axios = require("axios");
const formData = require("form-data");
const fs = require("fs");
const base_url = "http://localhost:3000";

const listUsers = async () => {
    try {
        const response = await axios.get(`${base_url}/api/users`);
        console.log(response.data);        
    } catch (error) {
        console.error(error);        
    }
};

const getUser = async (id) => {
    try {
        const response = await axios.get(`${base_url}/api/users/${id}`);
        console.log(response.data);        
    } catch (error) {
        console.error(error);        
    }
};

const addUser = async (user) => {
    try {
        const response = await axios.post(`${base_url}/api/users`, user);
        console.log(response.data);        
    } catch (error) {
        console.error(error);        
    }    
};

const updateUser = async (id, user) => {
    try {
        const response = await axios.put(`${base_url}/api/users/${id}`, user);
        console.log(response.data);        
    } catch (error) {
        console.error(error);        
    }    
};

const partialUpdateUser = async (id, user) => {
    try {
        const response = await axios.patch(`${base_url}/api/users/${id}`, user);
        console.log(response.data);        
    } catch (error) {
        console.error(error);        
    }    
};

const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${base_url}/api/users/${id}`);
        console.log(response.data);        
    } catch (error) {
        console.error(error);        
    }
};

const uploadUsers = async (id, filePath, type) => {
    try {
        const form = new formData();
        form.append('type', type);
        form.append('file', fs.createReadStream(filePath));

        const response = await axios.post(`${base_url}/api/users/upload/${id}`, form, {
            headers: form.getHeaders()
        });

        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

listUsers();

// getUser(1);

/* addUser({
    name: 'user',
    email: 'user@example.com',
    password: '123',
}); */

/* updateUser(4, {
    name: 'User',
    // email: 'user@example.com',
    // password: 123,
}); */

/* partialUpdateUser(4, {
    name: 'User',
    // email: 'user@example.com',
    // password: 123,
}); */

// deleteUser(4);

// uploadUsers(4, './120.png', 'profile');