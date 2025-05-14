const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const peliculaRoutes = require('./routes/peliculaRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes); // montar rutas
app.use('/api/peliculas', authMiddleware, peliculaRoutes);

module.exports = app;
