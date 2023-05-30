const mongoose = require('mongoose');
// On définit le schema de model
const roleSchema = mongoose.Schema(
    {
        reference: {
            type: String,
            required: [true, "Veuillez définir la référence du r^le !"]
        },
        libelle: {
            type: String,
            required: [true,"Veuillez définir le libellé du r^le !"]
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

const Role = mongoose.model('role', roleSchema);
module.exports = Role;