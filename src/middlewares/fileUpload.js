const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const exampleId = req.params.id;
        const type = req.body.type;
        let folderName;

        if (type === 'primary') {
            folderName = 'primary_picture';
        } else if (type === 'secondary') {
            folderName = 'secondary_picture';
        } else {
            return cb(new Error('Invalid type'));
        }

        const exampleFolderPath = `./uploads/${exampleId}/${folderName}`;

        if (!fs.existsSync(exampleFolderPath)) {
            fs.mkdirSync(exampleFolderPath, { recursive: true });
        }

        const files = fs.readdirSync(exampleFolderPath);
        files.forEach((fileName) => {
            const filePath = `${exampleFolderPath}/${fileName}`;
            fs.unlinkSync(filePath);
        });

        cb(null, exampleFolderPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;