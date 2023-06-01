const mongoose = require('mongoose');
const Admin = require('./modelAdmin');
const Stocke = require('./modelStocke');
const Categorie = require('./modelCategorie');
// On définit le schema de model
const articleSchema = mongoose.Schema(
    {
        libelle: {
            type: String,
            required: [true, 'Veuillez définir le libelle de l\'article !']
        },
        quantite: {
            type: Number,
            required: [true, 'Veuillez définir la quantité de l\'article !']
        },
        prix_unitaire: {
            type: Number,
            required: [true, 'Veuillez définir le prix unitaire de l\'article !']
        },
        montant: {
            type: Number,
            required: [true, 'Veuillez définir le montant de l\'article !']
        },
        etat:{
            type: Boolean,
            default: true,
            required: true
        },
        statut:{
            type: Number,
            default: 1,
            required: true
        },
        stockes:[
            {type: mongoose.Schema.Types.ObjectId, ref: Stocke}
        ],
        categorie:[
            {type: mongoose.Schema.Types.ObjectId, ref: Categorie}
        ],
        admins:[
            {type: mongoose.Schema.Types.ObjectId, ref: Admin}
        ]
    },
    {
        timesTamps: true
    }
)

const Article = mongoose.model('article', articleSchema);
module.exports = Article;