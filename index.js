const express = require('express');
const cors = require('cors');
const app = express();
const checkJWT = require('./middleware/checkJWT');

const dataSource = require('./persistence/dataSource');
const {loggerInfo, loggerError} = require('./utils/logger')

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.use(cors());

app.use('/', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
app.use('/users', checkJWT, require('./routes/users'));
app.use('/posts', checkJWT, require('./routes/posts'));
app.use('/profile', checkJWT, require('./routes/profile'))

const PORT = process.env.PORT || 5000;

// Connection to DB
dataSource.initialize().then( () => {
    //console.log('db connection ok');
    loggerInfo.info('connected to db')

}).catch( (err) => {
    //console.log('Error during connection to DB: ' + err)
    loggerError.error('error during conection to db ' + err)
});

app.listen(PORT, () => {
    console.log('Server started on port ', PORT);
    loggerInfo.info('Server started on PORT '+ PORT);
}

);
