const express = require('express');
const router = express.Router();
var AccountModel = require('../models/account')
const user = require('../controllers/user');
//---------------GET LOGIN/REGISTER----------------------//
router.get('/login', user.login_get);
router.get('/register', user.register_get);

//----------------POST LOGIN/REGISTER -------------//
router.post('/login', user.login_post)
router.post('/register', user.register_post)

//-------------FORGOT---------------------//
router.get('/forgot-password', user.forgot_get)
router.post('/forgot-password', user.forgot_post)


//----------------RESET------------------------//
router.get('/reset-password/:id/:token', user.reset_get)
router.post('/reset-password', user.reset_post)

module.exports = router;
//