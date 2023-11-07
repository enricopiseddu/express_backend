const express = require('express');
//const uuid = require('uuid');
const checkJWT = require('../middleware/checkJWT');
const router = express.Router();
const dataSource = require('./../persistence/database')
const userEntitySchema = require('./../persistence/entity/User')
const userRepository = dataSource.getRepository(userEntitySchema)
const users = require("../data/Users");

router.get('/', /*checkJWT ,*/ async (req,res) => {
    //console.log('called get on users')
    
    const usersFromDb = await userRepository.find();
    //console.log(usersFromDb);
    res.send(usersFromDb);

});

router.delete('/:userId', async(req, res) => {
    const idToDelete = req.params.userId;

    //const userToDelete = users.find( (user) => user.id === idToDelete);

    const userToDelete = await userRepository.findOneBy({id: idToDelete});

    console.log('user to delete is', userToDelete);
/*
    if (userToDelete === undefined){
        res.send('Impossibile cancellare, utente non trovato');
    }else{
        indexOfUser = users.findIndex((user) => user.id === idToDelete);
        users.splice(indexOfUser, 1); //a partire dall'indice (1° arg), ne cancella tot (2° argom)

        res.send({indexOfUser});
    }*/

    if(userToDelete){
        await userRepository.remove(userToDelete);
        res.send('user deleted correctly');
    }else{
        res.status(404).send('user to delete not found');
    }
   
});

//Update user
router.put('/updateUser', (req,res) =>{
    const userIdToUpdate = req.body.id;
    const newUsername = req.body.newUsername;

    const userToUpdate = users.find( (user) => user.id === userIdToUpdate );

    if(userToUpdate === undefined){
        res.send('Impossibile aggiornare, utente non trovato');
    }
    else{
        const userIndexToUpdate = users.findIndex((user) => user.id === userIdToUpdate);
        users[userIndexToUpdate].username = newUsername;
        console.log(users[userIndexToUpdate]);
        res.send('Username aggiornato');
    }

    

});



module.exports = router;

