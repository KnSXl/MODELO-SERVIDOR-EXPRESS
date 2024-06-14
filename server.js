// Importação dos módulos necessários
const express = require('express'); // Para criar o servidor
const multer  = require('multer'); // Para lidar com uploads de arquivos
const cors = require('cors'); // Para habilitar o CORS
const fs = require('fs'); // Para interagir com o sistema de arquivos
const banco = require('./banco.json'); // Para simular um banco de dados

// Inicialização do servidor Express
const app = express();

// Configurações de porta e IP
const port = 3000;
const ip = '123.123.123.123'; // Trocar IP

// Configuração do multer para o destino dos uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.params.id;
        const type = req.body.type;
        let folderName;

        if (type === 'profile') {
            folderName = 'profile_picture';
        } else if (type === 'cover') {
            folderName = 'cover_picture';
        } else {
            // Tipo inválido, responde com erro
            return cb(new Error('Tipo inválido'));
        }

        const userFolderPath = `./uploads/${userId}/${folderName}`;

        // Cria o diretório com base no tipo (profile ou cover) se ainda não existir
        if (!fs.existsSync(userFolderPath)) {
            fs.mkdirSync(userFolderPath, { recursive: true });
        }

        // Verifica se a imagem já existe na pasta e exclui
        const files = fs.readdirSync(userFolderPath);
        files.forEach((fileName) => {
            const filePath = `${userFolderPath}/${fileName}`;
            fs.unlinkSync(filePath);
        });

        cb(null, userFolderPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Deixa a pasta estatica
app.use('/uploads', express.static('uploads'));

const request = multer({ storage: storage });

// Middlewares
app.use(express.json()); // Para parsear o corpo da requisição como JSON
app.use(cors()); // Para habilitar o CORS

// Rota principal
app.get('/', (req, res) => {
    res.send('Servidor Rodando!');
});

// Rota para listar todos os usuários
app.get('/users', (req, res) => {
    res.json(banco.users);
});

// Rota para obter um usuário por ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const usuario = banco.users.find(user => user.id === userId);
    if (!usuario) {
        res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
        res.json(usuario);
    }
});

// Rota para adicionar um novo usuário
app.post('/users', request.none(), (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Por favor, forneça name, email e password" })
    }
    const novoUsuario = {
        id: banco.users.length + 1,
        name,
        email, 
        password
    };    

    banco.users.push(novoUsuario);
    atualizarBanco();
    res.status(201).json(novoUsuario);
});

// Rota para fazer upload de arquivos de avatar com o ID do usuário
app.post('/users/upload/:id', request.single('file'), (req, res) => {
    const userId = parseInt(req.params.id);
    const usuario = banco.users.find(user => user.id === userId);
    const type = req.body.type;
    
    if (!usuario) {
        res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
        const folderName = type === 'profile' ? 'profile_picture' : 'cover_picture';
        usuario[folderName] = `http://${ip}:${port}/uploads/${userId}/${folderName}/${req.file.filename}`;
        atualizarBanco();
        res.json({ message: `Imagem de ${type === 'profile' ? 'perfil' : 'capa'} atualizada com sucesso` });
    }
});


// Rota para atualizar um usuário existente (substituindo todos os campos)
app.put('/users/:id', request.none(), (req, res) => {
    const userId = parseInt(req.params.id);
    const index = banco.users.findIndex(user => user.id === userId);

    if (index === -1) {
        res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
        banco.users[index] = { id: userId, ...req.body };
        atualizarBanco();
        res.json(banco.users[index]);
    }
});

// Rota para atualizar parcialmente um usuário pelo ID (atualizando apenas os campos enviados)
app.patch('/users/:id', request.none(), (req, res) => {
    const userId = parseInt(req.params.id);
    const index = banco.users.findIndex(user => user.id === userId);

    if (index === -1) {
        res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
        banco.users[index] = { id: userId, ...banco.users[index], ...req.body };
        atualizarBanco();
        res.json(banco.users[index]);
    }
});

// Rota para excluir um usuário
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = banco.users.findIndex(user => user.id === userId);
    if (index === -1) {
        res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
        banco.users.splice(index, 1);
        atualizarBanco();
        res.json({ message: 'Usuário excluído com sucesso' });
    }
});

// Função para atualizar o banco de dados
function atualizarBanco() {
    fs.writeFileSync(__dirname + '/banco.json', JSON.stringify(banco, null, 2));
}

// Inicialização do servidor
app.listen(port, ip, () => {
    console.log(`Servidor rodando em http://${ip}:${port}`);
});

// Inicialização do servidor (usando localhost)
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
