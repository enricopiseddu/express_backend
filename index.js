const express = require('express');
const cors = require('cors');
const app = express();

const dataSource = require('./persistence/dataSource');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.use(cors());

app.use('/', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

const PORT = process.env.PORT || 5000;

// Connection to DB
dataSource.initialize().then( () => {
    console.log('db connection ok');

}).catch( (err) => {
    console.log('Error during connection to DB: ' + err)
});

app.listen(PORT, () => console.log('Server started on port ', PORT));
