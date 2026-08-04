import express from "express";
const route = express.Router();
import mascotasController from "../controllers/mascotas.js";
import upload from "../config/multer.js";

// upload.single('imagen') procesa el archivo enviado en el campo 'imagen' (form-data)
route.post('/', upload.single('imagen'), mascotasController.create);
route.get('/:id', mascotasController.getOne);
// En el update también se permite subir/reemplazar la imagen
route.put('/:id', upload.single('imagen'), mascotasController.update);
route.delete('/:id', mascotasController.delete);
route.get('/', mascotasController.getAll);

export default route;
