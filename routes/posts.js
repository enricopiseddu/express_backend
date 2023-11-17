const express = require('express');
const router = express.Router();
const uuid4 = require('uuid4');

const postsRepository = require('../persistence/PostRepository');

const {loggerInfo} = require('../utils/logger');


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
router.post('/newPost', async(req,res) => {
    let title = req.body.title;
    let notes = req.body.notes;

    if( title.length === 0 || notes.length === 0) {
        res.send('Title and contend are required');
    }
    else{
        await postsRepository.createNewPost( uuid4(), title, notes, req.userId )
        loggerInfo.info('User with username ' + req.username + ' published a post');
        res.send('post published');
    }
});


router.get('/personal', async(req,res) =>{
    
    const personalPosts = await postsRepository.getPostsOfUser(req.userId);
    loggerInfo.info('User with username ' + req.username + ' made a GET to see all his posts');
    res.send(personalPosts);
})

router.delete('/delete/:id', async(req,res) =>{
    
    try{
        postToDelete = await postsRepository.getPostById(req.params.id)
        console.log(postToDelete)
        //check if user is owner of the post
        if( postToDelete[0].userId === req.userId){
            await postsRepository.deletePost(postToDelete[0].id);
            console.log('post delete correctly')
            res.send('Post deleted correctly')
        }else{
            console.log('You are not the owner of the post')
            res.status(403).send('You are not the owner of the post')
        }

    }catch (error){
        console.log(error)
        res.status(500).send('Internal error')
    }
})


    
router.get('/paginated', async (req,res) => {
    const pagina = req.query.page;
    const perPagina = req.query.perPage; //LIMIT

    //calcolo offset
    const offset = (pagina - 1) * perPagina;

    try{
        const posts = await postsRepository.getAllPostsWithUsernamePaginated(perPagina, offset);
        const allPosts = await postsRepository.getAllPosts();
        res.send({posts, numberOfPosts: allPosts.length}); 
    } catch ( error ){
        console.log('an error occurs: ' + error)
        res.status(500).send('an error occurred ' + error)
    }
    
})

router.get('/search', async (req,res)=> {
    const string = req.query.string;

    try{
        const results = await postsRepository.getPostsContaining(string);
        res.send(results);
    }catch (error) {
        console.log('an error occurs: ' + error)
        res.status(500).send('an error occurred ' + error)
    }
})


router.put('/update/:id', async(req,res) =>{
    
    try{
        const postToUpdate = await postsRepository.getPostById(req.params.id)
        console.log('req.params.id ' , req.params.id )
        console.log('post to update ', postToUpdate )
        console.log('req.userId ', req.userId)
        //check if user is owner of the post
        if( postToUpdate[0].userId === req.userId){
            await postsRepository.updatePost(postToUpdate[0].id, req.body.title, req.body.notes);
            console.log('post updated correctly')
            res.send('Post updated correctly')
        }else{
            console.log('You are not the owner of the post')
            res.status(403).send('You are not the owner of the post')
        }

    }catch (error){
        console.log(error)
        res.status(500).send('Internal error')
    }
})


module.exports = router;