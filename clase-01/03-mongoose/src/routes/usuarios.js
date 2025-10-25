import { Router } from "express";

import { usuario } from '../models/usuarios.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const usuarios = await usuario.find()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).send('fallo el acceso')
    }
})

router.post('/', async (req, res) => {
    const { nombre, apellido, edad, dni } = req.body

    if (!nombre || !apellido || !edad || !dni) {
        return res.status(400).send('amiguito te faltan datos')
    }

    try {
        const nuevoUsuario = new usuario({nombre, apellido, edad, dni})
        await nuevoUsuario.save()
        res.status(201).send('creado correctamente')
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router