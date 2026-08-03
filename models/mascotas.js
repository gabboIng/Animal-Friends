import dbClient from "../config/dbClient.js";

class mascotasModelo{
    async create(mascota){
    const colMascotas = dbClient.db.collection('mascotas');
    await colMascotas.insertOne(mascota);

    }
          
}   

export default new mascotasModelo();

