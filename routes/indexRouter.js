// On importe d'express dans notre fichier du même nom
const express = require('express');
// On définit une instance de la class Route sur express
const Router = express.Router();

const IndexController = require('../controllers/indexController');
// On importe le controller chargé de faire du CRUD des administrateur (Patron et employés)
const AdminController = require('../controllers/adminController');
// On importe le controller chargé de faire du CRUD des stockes
const StockeController = require('../controllers/stockeController');
// On importe le controller chargé de faire du CRUD des catégories
const CategorieController = require('../controllers/categorieController');
// On importe le controller chargé de faire du CRUD des articles
const ArticleController = require('../controllers/articleController');
// On importe le controller chargé de faire du CRUD des employés
const EmployeController = require('../controllers/employeController');

// On définit la route permettant d'acéder à la page d'accueil de l'administrateur principal
Router.get('/', IndexController.dashboard);
// On définit la route post permettant d'enregistrer un nouveau d'administrateur
Router.post('/create.admin', AdminController.create);
// On définit la route post permettant d'enregistrer un nouveau stocke
Router.post('/create.stocke', StockeController.create);
// On définit la route post permettant d'enregistrer une nouvelle catégorie
Router.post('/create.categorie', CategorieController.create);
// On définit la route post permettant d'enregistrer un nouveau article
Router.post('/create.article', ArticleController.create);
// 
Router.post('/create.employe', EmployeController.create)
// En fin on exporte l'instance Router de la class express pour pouvoir l'utiliser à d'autre fin
module.exports = Router