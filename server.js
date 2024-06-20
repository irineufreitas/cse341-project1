const express = require('express');
const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', require('./routes/index'));

app.use('/contacts', require('./routes/contacts'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node running on http://localhost:${port}`);
        });
    }
});
