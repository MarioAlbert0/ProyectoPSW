const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

exports.getAll = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
}

exports.register = async ({ usuario, password }) => {
  try {
    const exists = await User.findOne({ where: { usuario } });
    if (exists) {
      return { status: 400, data: { error: 'El usuario ya existe' } };
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ usuario, password: hash });

    return { status: 200, data: { mensaje: 'Registro exitosaaao' } };
  } catch (error) {
    console.error('Error al registrar:', error);
    return { status: 500, data: { error: 'Error interno al registrar' } };
  }
};

exports.login = async ({ usuario, password }) => {
  try {
    const user = await User.findOne({ where: { usuario } });

    if (!user) {
      return { status: 401, data: { error: 'Credenciales incorrectas' } };
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return { status: 401, data: { error: 'Credenciales incorrectas' } };
    }

    const token = jwt.sign(
      { id: user.id, usuario: user.usuario },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { status: 200, data: { mensaje: 'Login correcto', token } };

  } catch (error) {
    console.error('Error en login:', error);
    return { status: 500, data: { error: 'Error interno al iniciar sesión' } };
  }
};
