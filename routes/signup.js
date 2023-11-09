const express = require('express');
const uuid4 = require('uuid4');
const router = express.Router();
const bcrypt = require('bcrypt');
const repository = require('../persistence/Repository');


router.get('/', (req,res) => {
    res.send('Signup page');
})


//Signup of an user by form
router.post('/', async(req,res) => {
    try{    
        var formUsername = req.body.username;
        var formPassword = req.body.password;

        const userFound = await repository.findUserByUsername(formUsername);
        
        console.log('user found is ')
        console.log(userFound)

        if(userFound === null){
            var _hashedPassword = await bcrypt.hash(formPassword, 10);

            var userId = uuid4();

            await repository.createNewUser(userId, formUsername, _hashedPassword);

            res.send('You have registered');
        }else{
            res.status(409).send('user already registered')
        }
    }catch(error){
        res.status(500).send('Internal server error')
    }
})


module.exports = router;