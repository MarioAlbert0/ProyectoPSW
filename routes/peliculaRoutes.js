const express = require('express');
const router = express.Router();
const controller = require('../controllers/peliculaController');

router.get('/api/peliculas', controller.getAll);
router.get('/api/peliculas/:id', controller.getOne);
router.post('/api/peliculas', controller.create);
router.put('/api/peliculas/:id', controller.update);
router.delete('/api/peliculas/:id', controller.delete);

module.exports = router;
