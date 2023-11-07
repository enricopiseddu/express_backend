const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const dataSource = require('./persistence/database');
const userEntity = require('./persistence/entity/User.js');
const { createConnection } = require('typeorm');
const { connect } = require('http2');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));


app.use(cors());

app.use('/', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

const PORT = process.env.PORT || 5000;


const connectionDb = dataSource.initialize().then(connection => {
    console.log('db connection ok');
}).catch( (err) => {
    console.log('error is ' + err)
})


app.listen(PORT, () => console.log('Server started on port ', PORT));

module.export = connectionDb;