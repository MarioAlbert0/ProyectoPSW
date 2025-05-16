const express = require('express');
const router = express.Router();
const controller = require('../controllers/userControllers/index');
const auth = require('../middlewares/authMiddleware');
const validateRegister = require('../middlewares/validateRegister');
const validateLogin = require('../middlewares/validateLogin');
const validateFields = require('../middlewares/validateFields');

router.post('/api/registro', validateRegister, validateFields, controller.register);
router.post('/api/login', auth, validateLogin, validateFields, controller.login);

// PROTEGIDAS
router.get('/api/usuarios', auth, controller.getAll);
router.get('/api/usuarios/:id', auth, controller.getOne);
router.put('/api/usuarios/:id', auth, controller.update);
router.delete('/api/usuarios/:id', auth, controller.delete);

module.exports = router;
