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

//Creating model
const CompanyModel= mongoose.model('Company', CompanySchema)
const QuestionModel = mongoose.model('Question', QuestionSchema)

//Export the file out and the model out 
module.exports = {
    CompanyModel: CompanyModel,
    QuestionModel: QuestionModel
}
