const mongoose = require('mongoose');
const Admin = require('./modelAdmin');
// On définit le schema de model
const roleSchema = mongoose.Schema(
    {
        reference: {
            type: String,
            required: [true, "Veuillez définir la référence du r^le !"]
        },
        libelle: {
            type: String,
            required: [true,"Veuillez définir le libellé du rôle !"]
        },
        statut: {
            type: Number,
            required: true,
            default: 1
        },
        admins:[
            {type: mongoose.Schema.Types.ObjectId, ref: Admin}
        ]
    },
    {
        timesTamps: true
    }
)

const Role = mongoose.model('role', roleSchema);
module.exports = Role;