import Mascota from "../schema/mascotas.js";

class mascotasModelo{
    async create(mascota){
        return await Mascota.create(mascota);
    }

    async update(id, mascota){
        return await Mascota.findByIdAndUpdate(id, mascota, { new: true });
    }

    async delete(id){
        return await Mascota.findByIdAndDelete(id);
    }

    async getAll(){
        return await Mascota.find();
    }

    async getOne(id){
        return await Mascota.findById(id);
    }
}

export default new mascotasModelo();
