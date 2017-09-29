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

module.exports = router