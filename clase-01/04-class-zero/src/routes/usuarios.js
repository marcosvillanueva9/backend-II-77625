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

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await usuario.find({_id: id})
        if (!user) return res.status(404).send('usuario no encontrado')
        res.status(200).json(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/', async (req, res) => {
    const { name, age, email } = req.body

    if (!name || !age || !email) {
        return res.status(400).send('amiguito te faltan datos')
    }

    try {
        const nuevoUsuario = new usuario({name, age, email})
        await nuevoUsuario.save()
        res.status(201).send('creado correctamente')
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const newData = req.body

    try {
        const userUpdated = await usuario.findByIdAndUpdate(id, newData)
        if (!userUpdated) return res.status(404).send('usuario no encontrado')
        res.status(200).send('actualizado correctamente')
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const userDeleted = await usuario.findByIdAndDelete(id)
        if (!userDeleted) return res.status(404).send('usuario no encontrado')
        res.status(200).send('eliminado correctamente')
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router