const express = require('express');
const router = express.Router();

const {getProductById,createProduct,getProduct,photo,removeProduct,updateProduct, getAllProduct,getAllUniqueCategories } = require('./../controllers/product');
const {getUserById } = require('./../controllers/user');
const {isAdmin,isAuthenticated,isSignedIn } = require('./../controllers/auth');


router.param('userId',getUserById);
router.param('productId',getProductById);

//read routes
router.post('/product/create/:userId',isSignedIn,isAuthenticated,isAdmin,createProduct);
router.get('/product/:productId',getProduct);
router.get('/product/photo/:productId',photo);
router.get('/products',getAllProduct);
router.get('/products/categories',getAllUniqueCategories);

//delete routes
router.delete('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,removeProduct);

//update routes
router.put('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,updateProduct);

module.exports = router;