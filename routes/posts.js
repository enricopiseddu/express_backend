const express = require('express');
const router = express.Router();

const checkJWT = require('../middleware/checkJWT');

const JWT = require('jsonwebtoken');

const postsRepository = require('../persistence/PostRepository');

//Everyone can see all posts
router.get('/all', async (req,res) => {
    
    try{
        const posts = await postsRepository.getAllPostsWithUsername();
        res.send(posts); 
    } catch ( error ){
        console.log('an error occurs: ' + error)
        res.status(500).send('an error occurred ' + error)
    }
    
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

