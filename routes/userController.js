const express = require('express')
const router = express.Router()


const Schema = require("../db/schema.js");
const UserModel = Schema.UserModel;

//Index route 
router.get('/', (request, response) => {
    
    //Finding the user in the dbs

    UserModel.find({})
    .then((user) => {
        
        //Then once they come back from the dbs
        //Render it in hbs
        response.render('users/index', {
            user: user
        })
    })
    .catch((error) => {
        console.log(error)
    })
})

// NEW route
router.get('/new', (request,response) => {
    //Render
    response.render('users/new') 
})



// CREATE route
router.post('/', (request, response) => {
    
        // getting new user info and putting it into the request body
        const newUser = request.body
    
        // CREATE and SAVE a new User using the UserModel
        UserModel.create(newUser)
            .then(() => {
                // THEN once the model has saved, redirect to the Companies INDEX
                response.redirect('/user')
            })
            .catch((error) => {
                console.log(error)
            })
    })

    

module.exports = router