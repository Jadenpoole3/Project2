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

    //Edit Router
    router.get('/:companyId/edit', (request, response) => {
        
            // GRAB the company ID from the parameters
            const companyId = request.params.companyId
        
            // FIND the company by ID using the CompanyModel
            CompanyModel.findById(companyId)
                .then((company) => {
                    // THEN once the company has been returned from
                    // the database, RENDER a form containing the current
                    // company information
                    response.render('companies/edit', {
                        company: company
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        })

//Update Route
        router.put('/:companyId', (request, response) => {
            
                // GRAB the company ID from the parameters
                const companyId = request.params.companyId
            
                // GRAB the updated Company info from the request body
                const updatedCompany = request.body
            
                // Use Mongoose to find the company by ID and update it with the 
                // new company info. Be sure to include the {new: true} option as your
                // third parameter
                CompanyModel.findByIdAndUpdate(companyId, updatedCompany, { new: true })
                    .then(() => {
                        // THEN once the new company info has been saved,
                        // redirect to that company's SHOW page
                        response.redirect(`/companies/${companyId}`)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })


    // Show Route 
    router.get('/:companyId', (request,response) => {


        //Get the Company ID
        const companyId = request.params.companyId

        //Use the model to find the id in the dbs
        CompanyModel.findById(companyId)
        .then((company) => {
            //Render it again and use companies show
            response.render('companies/show', {
                company: company
            })
        })
        .catch((error) => {
            console.log(error)
        })
    })

    // Delete Route 
    router.get('/:companyId/delete', (request,response) => {

        //get the company ID that I want to delete 
        const companyId = request.params.companyId
        

        //Company Model
        CompanyModel.findByIdAndRemove(companyId)
.then(() => {
    //redirect back to the companies index
    response.redirect('/companies')

//Catch your errors 
.catch((error) => {
console.log(error)
}) 
    })
})
    

module.exports = router