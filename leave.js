const Joi = require('joi')
const mongoose = require('mongoose')

const Leave = mongoose.model('Leave', new mongoose.Schema({
    empId:{
        type: String,
        required: true,
        maxlength:255
    },
    fdate:{
        type: Date,
        required: true
    },
    tdate:{
        type: Date,
        required: true
        // validate:{
        //     validator: function(value){
        //         return  value.dob>value.jdate;
        //     },
        //     message:'Joining date should be greater than date of birth'
        // }
    },
    status:{
        type:String,
        enum:['Accepted','Rejected']
    }
}))

function validateLeave(register){
    const schema= Joi.object({
        empId: Joi.string()
                .required()
                .trim()
                .max(255),
        fdate: Joi.date().required(),
        tdate: Joi.date().required(),
        status: Joi.string()                
    })
    return schema.validate(register)
}

module.exports={Leave, validateLeave}
