const express = require('express'); // On importe d'express dans notre fichier du même nom
const Router = express.Router();    // On définit une instance de la class Route sur express
const IndexController = require('../controllers/indexController');  
const AdminController = require('../controllers/adminController');    // On importe le controller chargé de faire du CRUD des administrateur (Patron et employés)
const StockeController = require('../controllers/stockeController');    // On importe le controller chargé de faire du CRUD des stockes
const CategorieController = require('../controllers/categorieController');  // On importe le controller chargé de faire du CRUD des catégories
const ArticleController = require('../controllers/articleController');  // On importe le controller chargé de faire du CRUD des articles
const EmployeController = require('../controllers/employeController');  // On importe le controller chargé de faire du CRUD des employés
const RoleController = require('../controllers/roleController');
const ArticleSortantController =require('../controllers/articleSortantController');
const Auth = require('../middleware/auth');
const LoginController = require('../controllers/loginController');

// les routes
Router.get('/', IndexController.dashboard);
Router.post('/createAdmin/', AdminController.create);
Router.post('/loginAdmin/', AdminController.login);
Router.post('/createStocke', Auth, StockeController.create);
Router.post('/createCategorie', Auth, CategorieController.create);
Router.post('/createArticle', ArticleController.create);
Router.post('/createEmploye', EmployeController.create);
Router.post('/createArticleSortant', ArticleSortantController.create);    // On définit la route post permettant d'enregistrer les articles vendus
Router.post('/createRole', RoleController.create);    // On définit la route post permettant d'enregistrer un nouveau rôle
Router.post('/login', LoginController.login)    // On définit la route post permettant de se connecter
Router.get('/getAllStocke', Auth, StockeController.read)    // On définit la route get permettant de récupérer tout les stockes
Router.get('/getStockeById/:id', Auth, StockeController.indexById)    // On définit la route get permettant de récupérer un seul stocke via son idenfitiant unique
Router.get('/getStockeByRef/:reference', Auth, StockeController.indexByRef)    // On définit la route get permettant de récupérer un seul stocke via son idenfitiant unique
// Router.post('/updateStocke/', Auth, StockeController.update);

module.exports = Router;    // En fin on exporte l'instance Router de la class express pour pouvoir l'utiliser à d'autre fin
