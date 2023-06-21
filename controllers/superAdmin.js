const Admin = require('../models/modelAdmin');
const { json, response } = require('express');
const bcrypt = require('bcrypt');
class SuperAdminController{
    static async addSuperAdmin(req, res){
        try{
            const infoAdmin={
                reference:"ADMIN100",
                email:"admin@gmail.com",
                nomPrenom:"SUPER ADMIN",
                telephone:"0909090909",
                createdAt: new Date(),
                updatedAt: new Date()
            };
            const password="root";
            Admin.findOne({reference:'ADMIN100'})
            .then(response=>{
                if(response){console.log("Le super administrateur est déjà ajouté.")}
                else{
                     bcrypt.hash(password, 10)
                    .then(async hash=>{
                        let admin =  new Admin({
                            ... infoAdmin,
                            reference: `ADMIN100`,
                            password: hash
                        });
                        await admin.save()
                        .then(resp=>{console.log("Super Administrateur est bien été ajouté.")})
                        .catch(er=>{console.log("Pas de super Administrateur.")})
                    })
                }
            })
        }catch(error){
            console.log("Pas de super Administrateur.")
        }
    }
}
// const newAdmin = SuperAdminController.addSuperAdmin
module.exports = SuperAdminController;