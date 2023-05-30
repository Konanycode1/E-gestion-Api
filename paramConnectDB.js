// On importe mongoose après avoir installé
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
// On définit la connexion à la base de données
// mongoose.connect(`mongodb+srv://nfcdjobo:nfcdjobo@atlascluster.khaljrt.mongodb.net/Gestion-Stockes?retryWrites=true&w=majority`)

mongoose.connect(`mongodb+srv://djobo:nfcDJOBO@cluster0.u2kh1wt.mongodb.net/`)
.then(()=>{
    console.log('Connexion éffectuée avec succès');
})
.catch(error=>{
    console.log(`Connexin non établie: ${error}`)
})
module.exports = mongoose;
// 