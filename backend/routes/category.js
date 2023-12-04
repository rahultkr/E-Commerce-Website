const express = require('express');
const Router = express.Router();

const {getCategorybyId,createCategory,getCategory,getAllCategory,updateCategory,removeCategory} = require('../controllers/category');
const {isAdmin,isAuthenticated,isSignedIn} = require('../controllers/auth');
const {getUserById} = require('../controllers/user');


Router.param('userId',getUserById);
Router.param('categoryId',getCategorybyId);


Router.post('/category/create/:userId',isSignedIn,isAuthenticated,isAdmin,createCategory);
Router.get('/category/:categoryId', getCategory);
Router.get('/categories', getAllCategory);
Router.put('/category/:categoryId/:userId',isSignedIn,isAuthenticated,isAdmin,updateCategory);
Router.delete('/category/:categoryId/:userId',isSignedIn,isAuthenticated,isAdmin,removeCategory);

module.exports =  Router;