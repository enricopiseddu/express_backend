const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();


const mongoose = require("mongoose")

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27018/mydb", () =>
  console.log("Connected to database successfully")
);




// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));


app.use(cors());

app.use('/', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log('Server started on port ', PORT));



