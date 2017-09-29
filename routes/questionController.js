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

module.exports = router