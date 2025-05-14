const { body } = require('express-validator');
const db = require('../config/db');

const validateRegister = [
  body('usuario')
    .notEmpty().withMessage('El nombre de usuario es obligatorio.')
    .isLength({ min: 3 }).withMessage('Debe tener al menos 3 caracteres.')
    .isString().withMessage('Debe ser un texto válido.'),
    
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria.')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),

  body('usuario').custom(async (usuario) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], (err, results) => {
        if (err) return reject(new Error('Error en la base de datos'));
        if (results.length > 0) {
          return reject(new Error('El usuario ya está registrado'));
        }
        resolve(true);
      });
    });
  })
];

module.exports = validateRegister;
