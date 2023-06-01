const mongoose = require('mongoose');
const Stocke = require('./modelStocke');
const Categorie = require('./modelCategorie');
const Article = require('./modelArticle');
const Employe = require('./modelEmploye');
// On définit le schema de model article (table articles)
const articleSortantSchema = mongoose.Schema(
    {
        reference: {
            type: String,
            required: true
        },
        libelle: {
            type: String,
            required: true
        },
        quantite: {
            type: Number,
            required: true
        },
        prix_unitaire: {
            type: Number,
            required: true
        },
        montant: {
            type: Number,
            required: true
        }, 
        stockes:[
            {type: mongoose.Schema.Types.ObjectId, ref: Stocke}
        ],
        categorie:[
            {type: mongoose.Schema.Types.ObjectId, ref: Categorie}
        ],
        articles:[
            {type: mongoose.Schema.Types.ObjectId, ref: Article}
        ],
        employes:[
            {type: mongoose.Schema.Types.ObjectId, ref: Employe}
        ]
    },
    {
        timesTamps: true
    }
)

const ArticleSortant = mongoose.model('articleSortant', articleSortantSchema);
module.exports = ArticleSortant;