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

module.exports = router