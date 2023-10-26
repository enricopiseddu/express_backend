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



module.exports = router;

