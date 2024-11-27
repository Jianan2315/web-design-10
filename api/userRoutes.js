const express = require('express');
const router = express.Router();
const userController = require('./userController');
const multerMiddleware = require('./multerMiddleware');

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/edit', userController.updateUser);
router.delete('/delete', userController.deleteUser);
router.get('/getAll', userController.getAllUsers);
router.post('/uploadImage', multerMiddleware.single('image'), userController.uploadImage);
router.get('/companies', userController.getAllCompanies);

module.exports = router;
