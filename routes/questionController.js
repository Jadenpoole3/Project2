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
                // PUSH the new question object into the Company's 
                // question array            
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
                const question = company.questions.id(questionId)
    
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

    // UPDATE route
router.put('/:questionId', (request, response) => {
    
        // GRAB the company ID from the parameters
        const companyId = request.params.companyId
    
        // GRAB the question ID from the parameters
        const questionId = request.params.questionId
    
        // GRAB the updated question object from the request body
        const updatedSnowboard = request.body
    
        // USE the CompanyModel to find the company by ID
        CompanyModel.findById(companyId)
            .then((company) => {
                // THEN once the company has been returned,
                // FIND the question by ID from the company's questions
                const question = company.questions.id(questionId)
    
                // MAP each attribute from the updated question object to
                // the same attribute on the original question
                question.name = updatedSnowboard.name
                question.price = updatedSnowboard.price
    
                // SAVE the updated company and return the PROMISE
                return company.save()
            })
            .then(() => {
                // THEN once the company has saved, REDIRECT to the 
                // question's SHOW page
                response.redirect(`/companies/${companyId}/questions/${questionId}`)
            })
    
    })
    
    // SHOW route
    router.get('/:questionId', (request, response) => {
    
        // GRAB the company ID from the parameters
        const companyId = request.params.companyId
        
        // GRAB the question ID from the parameters
        const questionId = request.params.questionId
    
        // USE the CompanyModel to find the company by ID
        CompanyModel.findById(companyId)
            .then((company) => {
                // THEN once the company has been returned,
                // FIND the question by ID from the company's questions
                const question = company.questions.id(questionId)
    
                // THEN render the question info using Handlebars
                // and pass the companyId to use in link URLs
                response.render('questions/show', {
                    question: question,
                    companyId: companyId
                })
            })
            .catch((error) => {
                console.log(error)
            })
    })

    // DELETE route
router.get('/:questionId/delete', (request, response) => {
    
        // GRAB the company ID from the parameters
        const companyId = request.params.companyId
        
        // GRAB the question ID from the parameters
        const questionId = request.params.questionId
    
        // USE the CompanyModel to find the company by ID
        CompanyModel.findById(companyId)
            .then((company) => {
                // THEN once the company has been returned,
                // REMOVE the question from the company's question array
                const question = company.questions.id(questionId).remove()
    
                // THEN save the company and return the PROMISE
                return company.save()
            })
            .then(() => {
                // THEN once the company has saved, redirect to the 
                // company's questions INDEX page
                response.redirect(`/companies/${companyId}/questions`)
            })
    })
    


module.exports = router