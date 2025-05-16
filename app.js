const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const peliculaRoutes = require('./routes/peliculaRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes); // montar rutas
app.use('/api/peliculas', peliculaRoutes);
app.use(userRoutes);
app.use(peliculaRoutes);

module.exports = app;
