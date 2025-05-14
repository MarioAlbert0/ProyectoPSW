const { body } = require('express-validator');

const validateLogin = [
  body('usuario').notEmpty().withMessage('El usuario es obligatorio.'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria.')
];

module.exports = validateLogin;
