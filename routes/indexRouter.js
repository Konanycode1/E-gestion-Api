const express = require('express'); // On importe d'express dans notre fichier du même nom
const Router = express.Router();    // On définit une instance de la class Route sur express
const IndexController = require('../controllers/indexController');  
const AdminController = require('../controllers/adminController');  // On importe le controller chargé de faire du CRUD des administrateur (Patron et employés)
const StockeController = require('../controllers/stockeController');    // On importe le controller chargé de faire du CRUD des stockes
const CategorieController = require('../controllers/categorieController');  // On importe le controller chargé de faire du CRUD des catégories
const ArticleController = require('../controllers/articleController');  // On importe le controller chargé de faire du CRUD des articles
const EmployeController = require('../controllers/employeController');  // On importe le controller chargé de faire du CRUD des employés
const RoleController = require('../controllers/roleController');
const ArticleSortantController =require('../controllers/articleSortantController')

Router.get('/', IndexController.dashboard); // On définit la route permettant d'acéder à la page d'accueil de l'administrateur principal
Router.post('/createAdmin', AdminController.create);    // On définit la route post permettant d'enregistrer un nouveau d'administrateur
Router.post('/createStocke', StockeController.create);  // On définit la route post permettant d'enregistrer un nouveau stocke
Router.post('/createCategorie', CategorieController.create);    // On définit la route post permettant d'enregistrer une nouvelle catégorie
Router.post('/createArticle', ArticleController.create);    // On définit la route post permettant d'enregistrer un nouveau article
Router.post('/createEmploye', EmployeController.create)     // On définit la route post permettant d'enregistrer un nouveau employé
Router.post('/createEmploye', RoleController.create);    // On définit la route post permettant d'enregistrer un nouveau rôle
Router.post('/createArticleSortant', ArticleSortantController.create);    // On définit la route post permettant d'enregistrer un nouveau rôle

module.exports = Router;    // En fin on exporte l'instance Router de la class express pour pouvoir l'utiliser à d'autre fin