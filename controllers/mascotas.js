import mascotasModel from '../models/mascotas.js';

const limpiarBody = (body) => {
    for (const key of Object.keys(body)) {
        if (body[key] === "") delete body[key];
    }
    return body;
};

class mascotasController {
    constructor() {

    }

    async create(req, res) {
        try{
            // Elimina los campos vacíos que envía form-data para que mongoose no falle 
            limpiarBody(req.body);
            // req.file lo llena multer con el archivo subido; guardamos su ruta en el campo imagen
            if (req.file) req.body.imagen = "/uploads/" + req.file.filename;
            const data = await mascotasModel.create(req.body);
            res.status(201).json(data);
        }catch(e){
            console.error(e);
            res.status(500).json({status: "create-error", message: "Error al crear la mascota"});
        }
    }

    async update(req, res) {
        try{
            limpiarBody(req.body);
            // Si viene una imagen nueva en el update, se actualiza la ruta del campo imagen
            if (req.file) req.body.imagen = "/uploads/" + req.file.filename;
            const data = await mascotasModel.update(req.params.id, req.body);
            res.status(201).json(data);
        }catch(e){
            console.error(e);
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try{
            await mascotasModel.delete(req.params.id);
            res.status(206).json({status: "delete-ok"});
        }catch(e){
            res.status(500).json({status: "delete-error", message: "Error al eliminar la mascota"});
        }
    }

    async getAll(req, res) {
        try{
            const data = await mascotasModel.getAll();
            res.status(200).json(data);
        }catch(e){
            res.status(500).json({status: "getall-error", message: "Error al obtener las mascotas"});
        }
    }

    async getOne(req, res) {
        try{
            const data = await mascotasModel.getOne(req.params.id);
            res.status(201).json(data);
        }catch(e){
            res.status(500).json({status: "getone-error", message: "Error al obtener la mascota"});
        }
    }
}

export default new mascotasController();