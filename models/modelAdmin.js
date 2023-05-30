const mongoose = require('mongoose');
// On définit le schema de model
const adminSchema = mongoose.Schema(
    {
        reference: {
            type: String,
            required: [true, "Veuillez définir la référence de l'admin !"]
        },
        nomPrenom: {
            type: String,
            required: [true,"Veuillez définir le nom de l'admin !"]
        },
       
        email: {
            type: String,
            required: [true,"Veuillez définir l'adresse email de l'admin !"]
        },
        telephone: {
            type: String,
            required: [true,"Veuillez définir l'adresse téléphonique de l'admin !"]
        },
        password: {
            type: String,
            required: [true,"Veuillez définir le mot de passe de l'admin !"]
        }
    },
    {
        timesTamps: true
    }
)

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;