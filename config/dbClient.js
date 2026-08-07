import mongoose from "mongoose";

class dbClient {
    constructor() {
        this.conectarBaseDatos();
    }

    async conectarBaseDatos() {
        //const queryString = `mongodb://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.DB_HOSTS}/?ssl=true&replicaSet=${process.env.DB_REPLICA_SET}&authSource=${process.env.DB_AUTH_SOURCE}&appName=adopcion`;
        const queryString = `mongodb://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.DB_HOSTS}/${process.env.DB_NAME}?ssl=true&replicaSet=${process.env.DB_REPLICA_SET}&authSource=${process.env.DB_AUTH_SOURCE}&appName=adopcion`;
        await mongoose.connect(queryString);
        console.log('Conexión a la base de datos establecida correctamente');
    }

    async cerrarConexion() {
        try {
            await mongoose.disconnect();
            console.log("Conexion a la base de datos cerrada correctamente");
        } catch (e) {
            console.error("Error al cerrar la conexion a la base de datos", e);
        }
    }
}

export default new dbClient();
