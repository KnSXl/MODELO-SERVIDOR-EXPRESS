const fs = require('fs');
const path = require('path');

function atualizarDatabase() {
    fs.writeFileSync(path.join(__dirname, '../data/database.json'), JSON.stringify(require('../data/database.json'), null, 4));
}

module.exports = { atualizarDatabase };
