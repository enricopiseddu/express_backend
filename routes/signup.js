const express = require('express');
const uuid4 = require('uuid4');
const router = express.Router();
const bcrypt = require('bcrypt');

//const users = require("../data/Users");
const dataSource = require('../persistence/database');
const userEntitySchema = require('../persistence/entity/User');
const {User} = require('../persistence/entity/User');


router.get('/', (req,res) => {
    res.send('Signup page');
})


//Sigup of an user by form
router.post('/', async(req,res) => {
        
    var formUsername = req.body.username;
    var formPassword = req.body.password;

    const userRepository = dataSource.getRepository(userEntitySchema);

    const userFound = await userRepository.findOneBy({username: formUsername});
    console.log('user found is ')
    console.log(userFound)

    if(!userFound){
        var _hashedPassword = await bcrypt.hash(formPassword, 10);

        var userId = uuid4();

        //creazione dell'oggetto secondo l'entità
        const newUser = userRepository.create({ id: userId, username: formUsername, hashedPassword: _hashedPassword});

        //salvataggio nel db
        await userRepository.save(newUser);
        res.send('You have registered');
    }else{
        res.status(409).send('user already registered')
    }
})


module.exports = router;