const mongoose=require('mongoose');

const Form = new mongoose.Schema({
    FirstTeam: {
        type: String,
        required: true
    },
    SecondTeam: {
        type: String,
        required: true
    }
})

const FormSchema = mongoose.export('form', Form);
module.exports(FormSchema);