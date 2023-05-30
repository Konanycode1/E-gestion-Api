// On importe d'express dans notre fichier du même nom
const express = require('express');
// On définit une instance de la class Route sur express
const Router = express.Router();

const IndexController = require('../controllers/indexController');
const AdminController = require('../controllers/adminController');
const StockeController = require('../controllers/stockeController');
const CategorieController = require('../controllers/categorieController');
const ArticleController = require('../controllers/articleController');
const EmployeController = require('../controllers/employeController');

// les routes
Router.get('/', IndexController.dashboard);
Router.post('/createAdmin/', AdminController.create);
Router.post('/loginAdmin/', AdminController.login);
Router.post('/createStocke', StockeController.create);
Router.post('/createCategorie', CategorieController.create);
Router.post('/createArticle', ArticleController.create);
Router.post('/createEmploye', EmployeController.create);
module.exports = Router