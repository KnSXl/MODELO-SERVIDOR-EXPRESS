const express = require('express');
const cors = require('cors');

const usersRoutes = require('../routes/usersRoutes');

const { ip } = require('../config/config');
const { usersPort } = require('../config/usersConfig');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use(usersRoutes);

app.get('/api', (req, res) => {
    res.json('Server Running!'); 
});

app.listen(usersPort, ip, () => {
    console.log(`Users server running at http://${ip}:${usersPort}`);
});
app.listen(usersPort, () => {
    console.log(`Users server running at http://localhost:${usersPort}`);
});