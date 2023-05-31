const mongoose = require('mongoose');
const Admin = require('./modelAdmin');
const categorieSchema = mongoose.Schema(    // On définit le schema de model
    {
        reference: {
            type: String,
            required: [true, 'Veuillez définir la référence de la catégorie !']
        },
        libelle: {
            type: String,
            required: [true, 'Veuillez définir le libelle de la catégorie !']
        },
        statut: {
            type: Number,
            required: true,
            default: 1
        },
        etat: {
            type: String,
            required:true,
            default: true
        },
        admins:[
            {type: mongoose.Schema.Types.ObjectId, ref: Admin}
        ]
    },
    {
        timesTamps: true
    }
)

const Categorie = mongoose.model('categorie', categorieSchema);
module.exports = Categorie;