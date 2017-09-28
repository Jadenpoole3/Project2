const mongoose = require('mongoose');

//First Make a Constructor for schema 
const Schema = mongoose.Schema;

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

