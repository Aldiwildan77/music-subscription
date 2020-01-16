const app = require('./App');
const db = require('./src/index');

const PORT = 5000;

db.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server running on Port 5000');
        });
    })