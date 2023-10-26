const express = require('express');
const router = express.Router();

const checkJWT = require('../middleware/checkJWT');
const posts = require('../data/Posts');
const JWT = require('jsonwebtoken');

//Everyone can see all posts
router.get('/all',(req,res) => {
    res.send(posts); 
})

//Only users with a JWT can publish posts
router.post('/newPost', (req,res) => {
    let title = req.body.title;
    let content = req.body.content;

    if( title.length === 0 || content.length === 0) {
        res.send('Title and contend are required');
    }
    else{
        posts.push({title, content});
        res.send('post published');
    }

    

});




module.exports = router;

