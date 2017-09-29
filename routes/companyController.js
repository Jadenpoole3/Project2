const express = require('express')
const router = express.Router()

const Schema = require("../db/schema.js");
const CompanyModel = Schema.CompanyModel;

//Index route 
router.get('/', (request, response) => {
    
    //Finding the companies in the dbs

    CompanyModel.find({})
    .then((companies) => {
        
        //Then once they come back from the dbs
        //Render it in hbs
        response.render('companies/index', {
            companies: companies
        })
    })
    .catch((error) => {
        console.log(error)
    })
})

// NEW route
router.get('/new', (request,response) => {
    //Render
    response.render('companies/new') 
})



// CREATE route
router.post('/', (request, response) => {
    
        // getting new company info and putting it into the request body
        const newCompany = request.body
    
        // CREATE and SAVE a new Company using the CompanyModel
        CompanyModel.create(newCompany)
            .then(() => {
                // THEN once the model has saved, redirect to the Companies INDEX
                response.redirect('/companies')
            })
            .catch((error) => {
                console.log(error)
            })
    })

module.exports = router