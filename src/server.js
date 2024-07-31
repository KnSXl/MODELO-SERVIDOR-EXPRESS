const express = require('express'); // Importa o Express
const cors = require('cors'); // Importa o CORS
const routes = require('./routes/routes'); // Importa as rotas
const { port, ip } = require('./config/config'); // Importa configurações

const app = express(); // Cria a instância do Express

app.use(express.json()); // Permite JSON no corpo das requisições
app.use(cors()); // Habilita CORS
app.use('/uploads', express.static('uploads')); // Serve arquivos estáticos em '/uploads'
app.use(routes); // Usa as rotas importadas

// Rota principal
app.get('/', (req, res) => {
    res.json('Server Running!'); 
});

// Inicia o servidor com IP
app.listen(port, ip, () => {
    console.log(`Server running at http://${ip}:${port}`);
});

// Inicia o servidor com localhost
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});