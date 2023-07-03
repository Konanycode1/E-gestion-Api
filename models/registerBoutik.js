import {model, Schema} from "mongoose";

 const registerBoutique = new Schema({
    nomBoutique : {type: String, required:true},
    localisation: {type:String,required: true},
    email : {type: String, required:true},
    numero:{type: String, required: true},
    numeroFixe :{type:Number, default: 0},
    logo: {type:String, required: true},
    ville: {type: String, required: true},
    password:{type:String, required: true}
})
export default model("Boutique", registerBoutique)