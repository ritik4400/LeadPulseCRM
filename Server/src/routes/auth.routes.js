const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authenticate')
const authorise = require('../middlewares/authorize')

const authController = require('../controllers/auth.controller');
router.post('/signup', authController.signUp);
router.post('/login',authController.login);

module.exports = router;