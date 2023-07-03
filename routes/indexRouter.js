const express = require('express'); // On importe d'express dans notre fichier du même nom
const Router = express.Router();    // On définit une instance de la class Route sur express
const IndexController = require('../controllers/indexController');  
const AdminController = require('../controllers/adminController');              // On importe le controller chargé de faire du CRUD des administrateur (Patron et employés)
const StockeController = require('../controllers/stockeController');            // On importe le controller chargé de faire du CRUD des stockes
const CategorieController = require('../controllers/categorieController');      // On importe le controller chargé de faire du CRUD des catégories
const ArticleController = require('../controllers/articleController');          // On importe le controller chargé de faire du CRUD des articles
const EmployeController = require('../controllers/employeController');          // On importe le controller chargé de faire du CRUD des employés
const RoleController = require('../controllers/roleController');
const ArticleSortantController =require('../controllers/articleSortantController');
const Auth = require('../middleware/auth');
const empAut = require('../middleware/empAut');
const ConnexionController = require('../controllers/connexionController');
const Multer =require('../middleware/multer')

// les routes
Router.get('/', IndexController.dashboard);

Router.post('/loginAdmin/', AdminController.login);

Router.post('/createAdmin/', AdminController.create);
Router.put('/updateAdmin/:id', AdminController.update);
Router.delete('/deleteAdmin/:id', AdminController.delete);
Router.get('/allAdmin/', AdminController.allRecup);
Router.get('/oneAdmin/:id', AdminController.recupId);

Router.post('/createArticle/',Auth, ArticleController.create);
Router.put('/updateArticle/:id',Auth, ArticleController.update);
Router.get('/readArticle/:id',Auth, ArticleController.read);
Router.get('/readAllArticle/',Auth, ArticleController.readAll);
Router.delete('/deleteArticle/:id',Auth, ArticleController.delete);

Router.post('/createStocke', Auth, StockeController.create);
Router.get('/getAllStocke', Auth, StockeController.read)                            // On définit la route get permettant de récupérer tout les stockes
Router.get('/getStockeById/:id', Auth, StockeController.indexById)                  // On définit la route get permettant de récupérer un seul stocke via son idenfitiant unique
Router.get('/getStockeByRef/:reference', Auth, StockeController.indexByRef)         // On définit la route get permettant de récupérer un seul stocke via son idenfitiant unique
Router.post('/updateStocke', Auth, StockeController.update);                        // On définit la route ppermettant de modifier les stockes engéristrés
Router.post('/deleteStocke', Auth, StockeController.delete);                        // On définit la route ppermettant de modifier le status les stockes engéristrés (Le principe adopté est que si le statut du stocke est à 1 le stocke en question est considéré comme pas encore supprimé et à 0 le stocke est vue comme supprimé)

Router.post('/createCategorie', Auth, CategorieController.create);
Router.get('/getAllCategorie', Auth, CategorieController.read)                       // On définit la route get permettant de récupérer tout les categories
Router.get('/getCategorieById/:id', Auth, CategorieController.indexById)             // On définit la route get permettant de récupérer un seul categorie via son idenfitiant unique
Router.get('/getCategorieByRef/:reference', Auth, CategorieController.indexByRef)    // On définit la route get permettant de récupérer un seul categorie via son idenfitiant unique
Router.post('/updateCategorie', Auth, CategorieController.update);                   // On définit la route ppermettant de modifier les categorie engéristrés
Router.post('/deleteCategorie', Auth, CategorieController.delete);                   // On définit la route ppermettant de modifier le status les catégories engéristrés (Le principe adopté est que si le statut du stocke est à 1 le stocke en question est considéré comme pas encore supprimé et à 0 le stocke est vue comme supprimé)

Router.post('/createEmploye', Auth, EmployeController.create);
Router.get('/getAllEmploye', Auth, EmployeController.read)                          // On définit la route get permettant de récupérer tout les categories
Router.get('/getEmployeById/:id', Auth, EmployeController.indexById)                // On définit la route get permettant de récupérer un seul categorie via son idenfitiant unique
Router.get('/getEmployeByRef/:reference', Auth, EmployeController.indexByRef)       // On définit la route get permettant de récupérer un seul categorie via son idenfitiant unique
Router.post('/updateEmploye', Auth, EmployeController.update);                      // On définit la route ppermettant de modifier les categorie engéristrés
Router.post('/deleteEmploye', Auth, EmployeController.delete);                      // On définit la route ppermettant de modifier le status les catégories engéristrés (Le principe adopté est que si le statut du stocke est à 1 le stocke en question est considéré comme pas encore supprimé et à 0 le stocke est vue comme supprimé)

Router.post('/createRole', Auth, RoleController.create);                    // On définit la route post permettant d'enregistrer un nouveau rôle
Router.get('/getAllRole', Auth, RoleController.read)                        // On définit la route get permettant de récupérer tout les categories
Router.get('/getRoleById/:id', Auth, RoleController.indexById)              // On définit la route get permettant de récupérer un seul categorie via son idenfitiant unique
Router.get('/getRoleByRef/:reference', Auth, RoleController.indexByRef)     // On définit la route get permettant de récupérer un seul categorie via son idenfitiant unique
Router.post('/updateRole', Auth, RoleController.update);                    // On définit la route ppermettant de modifier les categorie engéristrés
Router.post('/deleteRole', Auth, EmployeController.delete);                 // On définit la route ppermettant de modifier le status les catégories engéristrés (Le principe adopté est que si le statut du stocke est à 1 le stocke en question est considéré comme pas encore supprimé et à 0 le stocke est vue comme supprimé)

Router.post('/createArticleSortant', Multer, ArticleSortantController.create);                        // On définit la route post permettant d'enregistrer les articles vendus
// Router.get('/getAllArticleSortant', Auth, ArticleSortantController.read);                          // On définit la route post permettant d'enregistrer les articles vendus
// Router.get('/getArticleSortantById/:id', Auth, ArticleSortantController.indexById);                // On définit la route post permettant d'enregistrer les articles vendus
// Router.get('/getArticleSortantByRef/:reference', Auth, ArticleSortantController.indexByRef);       // On définit la route post permettant d'enregistrer les articles vendus
// Router.post('/updateArticleSortant', Auth, ArticleSortantController.update);                        // On définit la route post permettant d'enregistrer les articles vendus

Router.post('/loginEmploye', ConnexionController.login);

module.exports = Router;    // En fin on exporte l'instance Router de la class express pour pouvoir l'utiliser à d'autre fin
