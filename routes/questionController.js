const express = require('express')

const router = express.Router({ mergeParams: true })

const Schema = require("../db/schema.js");
const CompanyModel = Schema.CompanyModel;

//index route
router.get('/', (request,response) => {
    // get the id from the params 
    const companyId = request.params.companyId

    //Use the company model to find the id
    CompanyModel.findById(companyId)
    .then((company) => {
        //Render the company and use handlebars
        response.render('questions/index', {
            company: company
        })
  

    })
    // catch the error 
    .catch((error) => {
        console.log(error)
    })

    
})

// CREATE route
router.post('/', (request, response) => {
    
        // Get the company ID from the param
        const companyId = request.params.companyId
    
        // Get the new question from the request body
        const newQuestion = request.body
    
        // USE the CompanyModel to find the company by ID
        CompanyModel.findById(companyId)
            .then((company) => {
                // THEN once you have found the company from the database
                // PUSH the new snowboard object into the Company's 
                // snowboard array            
                company.questions.push(newQuestion)
    
                // SAVE the company and return the PROMISE
                return company.save()
            })
            .then((company) => {
                // THEN once the company has been saved, 
                // REDIRECT to the Snowboards index for that company
                response.redirect(`/companies/${companyId}/questions`)
            })
    
    })
    // EDIT route
router.get('/:questionId/edit', (request, response) => {
    
        // GRAB the company ID from the parameters
        const companyId = request.params.companyId
    
        // GRAB the question ID from the parameters
        const questionId = request.params.questionId
    
        // USE the CompanyModel to find the company by ID
        CompanyModel.findById(companyId)
            .then((company) => {
                // THEN once the company has been returned,
                // FIND the question by ID that you want to edit
                const question = company.questions.id(snowboardId)
    
                // RENDER a form pre-populated with that question info,
                // ALSO passing the companyId to use for the form's ACTION
                response.render('questions/edit', {
                    question: question,
                    companyId: companyId
                })
            })
            .catch((error) => {
                console.log(error)
            })
    })
    


module.exports = router