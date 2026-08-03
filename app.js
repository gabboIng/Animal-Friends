
import express from 'express';
import 'dotenv/config';
import routesMascotas from './routes/mascotas.js';

const app = express();
app.use('/mascotas', routesMascotas);

try {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`El server esta corriendo en el puerto ${PORT}`);
  });       
} catch (e) {
  console.error('Error al lebantar servidor :', e);
}