const multer = require('multer');
const fs = require('fs');

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
            return cb(new Error('Invalid type'));
        }

        const userFolderPath = `./uploads/${userId}/${folderName}`;

        if (!fs.existsSync(userFolderPath)) {
            fs.mkdirSync(userFolderPath, { recursive: true });
        }

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

const request = multer({ storage: storage });

module.exports = request;