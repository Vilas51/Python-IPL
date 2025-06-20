const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    FirstTeam: {
        type: String,
        required: true
    },
    SecondTeam: {
        type: String,
        required: true
    },
    FromYear: {
        type: Number,  
        required: true
    },
    ToYear: {
        type: Number,
        required: true
    }
});

const Form = mongoose.model('Form', FormSchema);
module.exports = Form;