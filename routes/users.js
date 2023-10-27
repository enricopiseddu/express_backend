const express = require('express');
//const uuid = require('uuid');
const checkJWT = require('../middleware/checkJWT');
const router = express.Router();

const users = require("../data/Users")
const JWT = require('jsonwebtoken');

router.get('/', /*checkJWT ,*/(req,res) => {
    res.send(users); 
});

router.delete('/:userId', (req, res) => {
    const idToDelete = req.params.userId;

    const userToDelete = users.find( (user) => user.id === idToDelete);

    if (userToDelete === undefined){
        res.send('Impossibile cancellare, utente non trovato');
    }else{
        indexOfUser = users.findIndex((user) => user.id === idToDelete);
        users.splice(indexOfUser, 1); //a partire dall'indice (1° arg), ne cancella tot (2° argom)

        res.send({indexOfUser});
    }
   
});

//Update user

router.put('/updateUser', (req,res) =>{
    const userIdToUpdate = req.body.id;
    const newUsername = req.body.newUsername;

    const userToUpdate = users.find( (user) => user.id === userIdToUpdate);

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

