const express = require('express');
const uuid4 = require('uuid4');
const router = express.Router();
const bcrypt = require('bcrypt');

const users = require("../data/Users");

router.get('/', (req,res) => {
    res.send('Signup page');
})

router.post('/', async(req,res) => {
        
    var name = req.body.username;
    var password = req.body.password;

    var userFound = users.find( (user) => user.username == name);

    if(userFound === undefined){
        var hashedPassword = await bcrypt.hash(password, 10);

        var userId = uuid4();

        users.push({id: userId, username: name, password: hashedPassword});
        res.send('You have registered');
    }
    else{
        res.status(409).send('User already registered')
    }
})

module.exports = router;