const Joi = require('joi')
const mongoose = require('mongoose')



    const Register = mongoose.model('Register', new mongoose.Schema({
        fname:{
            type: String,
            required: true,
            maxlength:255
        },
        lname:{
            type: String,
            required: true,
            maxlength:255
        },
        email:{
            type: String,
            required:true,
            maxlength:255,
            minlength:5,
            unique:true
        },
        password:{
            type: String,
            required:true,
            maxlength:255,
            minlength:5
        }, 
        role:{
            type: String,
            enum:['admin','employee']
            // maxlength:5,
            // minlength:4,
        },
        dept:{
            type: String,
            required: true,
            maxlength:255
        },
        dob:{
            type: Date,
            required: true
        },
        jdate:{
            type: Date,
            required: true,
            // validate:{
            //     validator: function(value){
            //         return  value.dob>value.jdate;
            //     },
            //     message:'Joining date should be greater than date of birth'
            // }
        }
    }))

    function validateUser(register){
        const schema= Joi.object({
            fname: Joi.string()
                    .required()
                    .trim()
                    .max(255),
            lname: Joi.string()
                    .required()
                    .trim()
                    .max(255),
            email: Joi.string()
                    .required()
                    .trim()
                    .max(255)
                    .min(5).email(),
            password: Joi.string()
                        .required()
                        .min(5)
                        .max(255),
            role: Joi.string().required(),
            dept: Joi.string().max(255).required(),
            dob: Joi.date().required(),
            jdate: Joi.date().required()                
        })
        return schema.validate(register)
    }

module.exports={Register, validateUser}
