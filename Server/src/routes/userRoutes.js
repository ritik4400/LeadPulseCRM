const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authenticate')
const authorise = require('../middlewares/authorize')

const userController = require('../controllers/userContoller');
router.post('/createUser',authenticate ,authorise('admin'),  userController.createUser);
router.get('/getUsers',userController.getUsers);
router.get('/getUserById',userController.getUserById);
router.put('/updateUser',userController.updateUser);
router.put('/deleteUser',userController.deleteUser);


module.exports = router;