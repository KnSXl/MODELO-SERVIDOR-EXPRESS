const multer = require('multer'); // Importa o multer para manipulação de uploads
const fs = require('fs'); // Importa o módulo fs para manipulação de arquivos e diretórios

const storage = multer.diskStorage({ // Configura o armazenamento do multer
    destination: function (req, file, cb) { // Define o diretório de destino para o arquivo
        const userId = req.params.id; // Obtém o ID do usuário da URL
        const type = req.body.type; // Obtém o tipo de arquivo do corpo da requisição
        let folderName;

        // Define o nome da pasta com base no tipo de arquivo
        if (type === 'profile') {
            folderName = 'profile_picture'; // Pasta para foto de perfil
        } else if (type === 'cover') {
            folderName = 'cover_picture'; // Pasta para foto de capa
        } else {
            return cb(new Error('Invalid type')); // Retorna erro se o tipo for inválido
        }

        const userFolderPath = `./uploads/${userId}/${folderName}`; // Caminho para a pasta do usuário

        // Cria a pasta do usuário se não existir
        if (!fs.existsSync(userFolderPath)) {
            fs.mkdirSync(userFolderPath, { recursive: true }); // Cria diretórios recursivamente
        }

        // Limpa arquivos antigos na pasta do usuário
        const files = fs.readdirSync(userFolderPath);
        files.forEach((fileName) => {
            const filePath = `${userFolderPath}/${fileName}`;
            fs.unlinkSync(filePath); // Remove cada arquivo
        });

        cb(null, userFolderPath); // Define o diretório de destino para o arquivo
    },
    // Define o nome do arquivo
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Usa o nome original do arquivo
    }
});

const request = multer({ storage: storage }); // Cria uma instância do multer com a configuração de armazenamento

module.exports = request; // Exporta a configuração do multer para ser usada em outros arquivos