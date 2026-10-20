import mongoose from "mongoose";

async function connectDb() {
    try{
        const database= await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongodb is connected to ${database.connection.host}`)
        console.log(`mongodb is connected to ${database.connection.name}`)
        console.log(`mongodb is connected to ${database.connection.port}`)
        console.log(`mongodb is connected to ${database.connection.user}`)
        console.log(`mongodb is connected to ${database.connection.ipv4 || database.connection.ipv6}`)
        console.log(`mongodb is connected to ${database.connection.client.s.url}`)
        console.log(`mongodb is connected to ${database.connection.client.s.options.dbName}`)
        console.log(`mongodb is connected to ${database.connection.client.s.options.authSource}`)
        console.log(`mongodb is connected to ${database.connection.client.s.options.replicaSet}`)
        console.log(`mongodb is connected to ${database.connection.client.s.options.ssl}`)
    }catch(err){
        console.log("mongodb is not connected",err);
         console.log(err.message)
         process.exit(1)
    }
}
export default connectDb;