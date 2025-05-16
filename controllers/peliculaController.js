const Pelicula = require('../models/Pelicula');

exports.getAll = async (req, res) => {
  const peliculas = await Pelicula.findAll();
  res.json(peliculas);
};

exports.getOne = async (req, res) => {
  const pelicula = await Pelicula.findByPk(req.params.id);
  if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
  res.json(pelicula);
};

exports.create = async (req, res) => {
  const nueva = await Pelicula.create(req.body);
  res.status(201).json(nueva);
};

exports.update = async (req, res) => {
  const pelicula = await Pelicula.findByPk(req.params.id);
  if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });

  await pelicula.update(req.body);
  res.json({ mensaje: 'Película actualizada' });
};

exports.delete = async (req, res) => {
  const pelicula = await Pelicula.findByPk(req.params.id);
  if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });

  await pelicula.destroy();
  res.json({ mensaje: 'Película eliminada' });
};
