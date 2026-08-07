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

    // ===== PAGINACIÓN =====
    async getPaginated(page = 1, limit = 6) {
        const skip = (page - 1) * limit;
        return await Mascota.find({ adoptado: false })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
    }

    async countTotal() {
        return await Mascota.countDocuments({ adoptado: false });
    }

    async getOne(id){
        return await Mascota.findById(id);
    }
}

export default new mascotasModelo();
