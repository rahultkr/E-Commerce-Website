const express = require('express');
const Router =  express.Router();

const { getUserById, getUser,updateUser,userPurchaseList} = require('../controllers/user');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');


Router.param('userId',getUserById);

Router.get('/user/:userId',isSignedIn,isAuthenticated,getUser);
Router.put('user/:userId',isSignedIn,isAuthenticated,updateUser);
Router.put('/orders/user/:userId',isSignedIn,isAuthenticated,userPurchaseList);



module.exports = Router;