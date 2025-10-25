import express from 'express'
import mongoose from 'mongoose'

import usuariosRouter from './src/routes/usuarios.js'

const app = express()
const PORT = 8080

const mongourl = 'mongodb://localhost:27017/miprimeradb'

mongoose.connect(mongourl, {})

app.use(express.json())

// DEFINIR RUTAS
app.use('/api/usuarios', usuariosRouter)

app.listen(PORT, () => {
    console.log(`escuchando en el ${PORT}`)
})