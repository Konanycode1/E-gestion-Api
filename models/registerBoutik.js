const mongoose = require("mongoose");

 const registerBoutique = mongoose.Schema({
    nomBoutique : {type: String, required:true},
    localisation: {type:String,required: true},
    email : {type: String, required:true},
    numero:{type: String, required: true},
    numeroFixe :{type:Number, default: 0},
    logo: {type:String, required: true},
    ville: {type: String, required: true},
    password:{type:String, required: true}
})
module.exports = mongoose.model("Boutique", registerBoutique)