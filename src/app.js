const express = require('express'); // Para criar o servidor
const cors = require('cors'); // Para habilitar o CORS
const routes = require('./routes/routes'); // Importar rotas de exemplo
const { port, ip } = require('./config/config') // Configurações de porta e IP

// Inicialização do servidor Express
const app = express();

app.use(express.json()); // Para parsear o corpo da requisição como JSON
app.use(cors()); // Para habilitar o CORS
app.use('/uploads', express.static('uploads')); // Deixa a pasta estatica

// Rota principal
app.get('/', (req, res) => {
    res.json('Server Running!');
});

// Usar as rotas de exemplo
app.use('/examples', routes); // Adicione novas rotas aqui

// Inicialização do servidor
app.listen(port, ip, () => {
    console.log(`Server running at http://${ip}:${port}`);
});

// Inicialização do servidor (usando localhost)
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});