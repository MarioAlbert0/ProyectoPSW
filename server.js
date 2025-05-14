const app = require('./app');
const sequelize = require('./config/sequelize');


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🟢 Servidor escuchando en http://localhost:${PORT}`);
});


sequelize.sync() // Usa sync({ force: true }) para reiniciar tablas
  .then(() => console.log('Modelos sincronizados'))
  .catch(err => console.error('Error al sincronizar modelos', err));