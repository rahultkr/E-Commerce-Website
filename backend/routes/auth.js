const express =require('express');
const {check} = require('express-validator');
const router = express.Router();
const {signout,signup,signin,isSignedIn} = require('../controllers/auth')

router.post('/signup',[
    check("name").isLength({min:3}).withMessage('name should be atleast 3 char'),
    check('email').isEmail().withMessage('Email is required'),
    check('password').isLength({min:3}).withMessage("password should be atleast 3 char")
],
signup);

router.post('/signin',[
    check('email').isEmail().withMessage('Email is required'),
    check('password').isLength({min:1}).withMessage("password field is required")
],
signin);


router.get('/signout',signout);

router.get('/testroute',isSignedIn,(req,res)=>{
    res.send('a protected route');
    
})

module.exports = router;