// On importe mongoose après avoir installé
const mongoose = require('mongoose');
const Role = require('./models/modelRole');
const Admin = require('./models/modelAdmin');
const bcrypt = require('bcrypt');
const { response } = require('express');

mongoose.set('strictQuery', false)
// On définit la connexion à la base de données

mongoose.connect(`mongodb+srv://konanycode:konanycode@cluster0.u2kh1wt.mongodb.net/?retryWrites=true&w=majority`,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{
    console.log('Connexion éffectuée avec succès');
    Role.find({})
    .then(role=>{
        if(role.length===0){
            const newRole = new Role({reference:'ROLE100', libelle: 'SUPER ADMINISTRATEUR', createdAt: new Date(), updatedAt: new Date()});
            newRole.save()
            .then(addRole=>{
                console.log(addRole, '\n\n')
                Admin.find({})
                .then(admin=>{
                    if(admin.length==0){
                        const password ='root';
                        const body = {
                            reference:'ADMIN100',
                            nomPrenom: 'SUPER ADMINISTRATEUR',
                            email: 'admin@gmail.com',
                            telephone: '0000000000',
                            role_id: addRole._id,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        };
                        bcrypt.hash(password, 10)
                        .then(async hash=>{
                            let admin =  new Admin({ ... body, password: hash });
                            await admin.save()
                            .then(response=>console.log(response))
                            .catch(error=>console.log(error));
                        })
                        .catch((error)=>console.log(error));
                    }
                })
            })
        }
    })
    

})
.catch(error=>{
    console.log(`Connexin non établie: ${error}`)
})
module.exports = mongoose;
