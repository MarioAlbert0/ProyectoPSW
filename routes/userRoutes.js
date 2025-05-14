const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers/index');
const validateRegister = require('../middlewares/validateRegister');
const validateLogin = require('../middlewares/validateLogin');
const validateFields = require('../middlewares/validateFields');
const auth = require('../middlewares/authMiddleware');

router.post('/api/registro', validateRegister, validateFields, userController.register);
router.post('/api/login', validateLogin, validateFields, userController.login);

router.get('/api/protegido', auth, (req, res) => {
  res.json({ mensaje: 'Acceso autorizado', usuario: req.user });
});

module.exports = router;
