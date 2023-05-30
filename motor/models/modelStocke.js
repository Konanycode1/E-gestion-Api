const mongoose = require('mongoose');
const Admin = require('./modelAdmin');
// On définit le schema de model
const stockeSchema = mongoose.Schema(
    {
        reference: {
            type: String,
            required: [true, 'Veuillez définir la référence du stocke !']
        },
        libelle: {
            type: String,
            required: [true, 'Veuillez définir le libelle du stocke !']
        },
        montant: {
            type: Number,
            required: [true, 'Veuillez définir le montant du stocke !']
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
        },
        admins:[
            {type: mongoose.Schema.Types.ObjectId, ref: Admin}
        ]
    },
    {
        timesTamps: true
    }
)

const Stocke = mongoose.model('Stocke', stockeSchema);
module.exports = Stocke;