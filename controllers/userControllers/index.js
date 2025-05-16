const User = require('../../models/User');
const userService = require('../../services/userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const exists = await User.findOne({ where: { usuario: req.body.usuario } });
    if (exists) return res.status(400).json({ error: 'Usuario ya registrado' });

    const hash = await bcrypt.hash(req.body.password, 10);
    const dataUser = await User.create({ usuario: req.body.usuario, password: hash });
     
    const token = jwt.sign(
      { id: dataUser.id, usuario: req.body.usuario },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ mensaje: 'Registro exitoso' , token});
  } catch (err) {
    res.status(500).json({ error: 'Error en registro' });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { usuario: req.body.usuario } });
    if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(401).json({ error: 'Credenciales incorrectas' });

    res.status(200).json({ mensaje: 'Login correcto' });
  } catch (err) {
    res.status(500).json({ error: 'Error en login' });
  }
};

exports.getAll = async (req, res) => {
  userService.getAll(req, res);
};

exports.getOne = async (req, res) => {
  const user = await User.findByPk(req.params.id, { attributes: ['id', 'usuario'] });
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(user);
};

exports.update = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  await user.update({ usuario: req.body.usuario });
  res.json({ mensaje: 'Usuario actualizado' });
};

exports.delete = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  await user.destroy();
  res.json({ mensaje: 'Usuario eliminado' });
};
