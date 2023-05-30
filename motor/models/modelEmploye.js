const mongoose = require('mongoose');
// On définit le schema de model
const employeSchema = mongoose.Schema(
    {
        reference: {
            type: String,
            required: [true, "Veuillez définir la référence de l'employé !"]
        },
        nomPrenom: {
            type: String,
            required: [true,"Veuillez définir le nom de l'employé !"]
        },
        email: {
            type: Number,
            required: [true,"Veuillez définir l'adresse email de l'employé !"]
        },
        telephone: {
            type: String,
            required: [true,"Veuillez définir l'adresse téléphonique de l'employé !"]
        },
        password: {
            type: String,
            required: [true,"Veuillez définir le mot de passe de l'employé !"]
        },
        role: {
            type: String,
            required: [true,"Veuillez définir le role de l'employé !"]
        },
        statut: {
            type: Number,
            required: true,
            default: 1
        },
        etat: {
            type: String,
            required:true,
            default: 'Vide'
        }
    },
    {
        timesTamps: true
    }
)

const Employe = mongoose.model('employe', employeSchema);
module.exports = Employe;