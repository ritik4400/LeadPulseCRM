const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authenticate')
const authorise = require('../middlewares/authorize')

const companyController = require('../controllers/companyController');
router.post()
