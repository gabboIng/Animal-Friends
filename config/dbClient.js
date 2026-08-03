
import {MongoClient} from 'mongodb';


class dbClient{
    constructor(){
       const queryString = `mongodb://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.DB_HOSTS}/?ssl=true&replicaSet=${process.env.DB_REPLICA_SET}&authSource=${process.env.DB_AUTH_SOURCE}&appName=adopcion`;
       
        this.client = new MongoClient(queryString);
        this.conectarDB();
    }

    async conectarDB(){
        try{
            await this.client.connect();
            this.db = this.client.db('adopcion');
            console.log('Conexión a la base de datos establecida correctamente');
        }catch(e){
            console.error('Error al conectar a la base de datos:', e);
        }
    }
}

export default new dbClient();