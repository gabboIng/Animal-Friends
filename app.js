
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import routesMascotas from './routes/mascotas.js';
import dbClient from './config/dbClient.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Expone la carpeta uploads como estática para poder ver las imágenes en el navegador
// (ej: http://localhost:5100/uploads/nombre-archivo.png)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/mascotas', routesMascotas);

try {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`El server esta corriendo en el puerto ${PORT}`);
  });       
} catch (e) {
  console.error('Error al lebantar servidor :', e);
}

process.on('SIGINT', async () => {
  console.log('Cerrando la aplicación...');
  await dbClient.cerrarConexion();
  process.exit(0);
});