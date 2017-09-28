const mongoose = require('mongoose');

//First Make a Constructor for schema 
const Schema = mongoose.Schema;

//Make a Question Schema 
const QuestionSchema = new Schema ({
    questions: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})


// Make a Company Schema
const CompanySchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    questions: [QuestionSchema]
});

//Create 