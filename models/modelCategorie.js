const mongoose = require('mongoose');
const Admin = require('./modelAdmin');
const Stocke = require('./modelStocke');
// On définit le schema de model
const categorieSchema = mongoose.Schema(
    {
        reference: {
            type: String,
            required: [true, 'Veuillez définir la référence de la catégorie !']
        },
        libelle: {
            type: String,
            required: [true, 'Veuillez définir le libelle de la catégorie !']
        },
        resume: {
            type: String,
            required: false
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
        stockes:[
            {type: mongoose.Schema.Types.ObjectId, ref: Stocke}
        ],
        admin:[
            {type: mongoose.Schema.Types.ObjectId, ref: Admin}
        ]
    },
    {
        timesTamps: true
    }
)

const Categorie = mongoose.model('categorie', categorieSchema);
module.exports = Categorie;