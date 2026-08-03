import mascotasModel from '../models/mascotas.js';


class mascotasController {
    constructor() {

    }

    async create(req, res) {
        try{
            const data = await mascotasModelo.create(req.body);
            res.status(201).json(data);
        }catch(e){
            res.status(500).json({status: "create-error", message: "Error al crear la mascota"});
        }
    }

    async update(req, res) {
        try{
            res.status(200).json({status: "update-ok", message: "Mascota actualizada correctamente"});
        }catch(e){
            res.status(500).json({status: "update-error", message: "Error al actualizar la mascota"});
        }
    }

    async delete(req, res) {
        try{
            res.status(200).json({status: "delete-ok", message: "Mascota eliminada correctamente"});
        }catch(e){
            res.status(500).json({status: "delete-error", message: "Error al eliminar la mascota"});
        }
    }

    async getAll(req, res) {
        try{
            res.status(200).json({status: "getall-ok", message: "Mascotas obtenidas correctamente"});
        }catch(e){
            res.status(500).json({status: "getall-error", message: "Error al obtener las mascotas"});
        }
    }

    async getOne(req, res) {
        try{
            res.status(200).json({status: "getone-ok", message: "Mascota obtenida correctamente"});
        }catch(e){
            res.status(500).json({status: "getone-error", message: "Error al obtener la mascota"});
        }
    }
}

export default new mascotasController();