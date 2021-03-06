const express = require('express');
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const cors = require('cors');

app.use(parser.json());
app.use(cors());

MongoClient.connect("mongodb://localhost:27017")
    .then((client)  => {
        const db = client.db('guests');
        const bookingsCollection = db.collection('bookings');
        const bookingsRouter = createRouter(bookingsCollection);
        app.use('/api/bookings', bookingsRouter);
    })
    .catch(console.err);

app.listen(3000, function () {
    console.log(`Listening on post ${ this.address().port }`);
});