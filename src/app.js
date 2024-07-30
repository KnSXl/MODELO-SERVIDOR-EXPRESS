const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const { port, ip } = require('./config/config')

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Rota principal
app.get('/', (req, res) => {
    res.json('Server Running!');
});

// Usar as rotas de exemplos
app.use('/examples', routes);

// Inicialização do servidor
app.listen(port, ip, () => {
    console.log(`Server running at http://${ip}:${port}`);
});

// Inicialização do servidor (usando localhost)
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});