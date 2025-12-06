import mongoose from "mongoose";

export default async function connectDB() {
    await mongoose.connect(process.env.MONGO_URL, {
        dbName: process.env.DB_NAME
    })
    console.log('conectado correctamente')
}