import { Router } from "express";
import bcrypt from 'bcrypt'

import userModel from "../models/user.model.js";

const userRouter = Router()

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json('falta algun dato')
    }

    const user = await userModel.findOne({username})
    if (!user || !isValidPassword(user, password)) {
        return res.status(401).json('user o password incorrecta')
    }

    res.status(200).json('logueado correctamente')
})

userRouter.post('/register', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json('falta algun dato')
    }

    const user = await userModel.findOne({username})
    if (user) {
        return res.status(400).json('ya existe ese username')
    }

    const hashedPassword = createHash(password)

    await userModel.create({username, password: hashedPassword})

    res.status(201).json('creado correctamente')
})

userRouter.post('/forgot-password', async (req, res) => {
    const { username, newPassword } = req.body
    if (!username || !newPassword) {
        return res.status(400).json('falta algun dato')
    }

    const user = await userModel.findOne({username})
    if (!user) {
        return res.status(401).json('user no existe')
    }

    const hashedPassword = createHash(newPassword)
    user.password = hashedPassword
    await user.save()

    res.status(201).json('actualizado correctamente')
})

export default userRouter

// $2b$10$xbaJXCHrxFA9e.HKlBxEv.1Rd3c2iQJieHjelSvNqZj3v4g.wppyy
// $2b$10$UCGXIABeO1HUuoS8z7jT..tktQ1vRuDPKo8bFgaNxQG1jwB2WyPP6
// $2b$10$bgrxCF3vDfqjMhmB.PcGLugWirpDaLMB/OLosmZ4bV4do2ezeF0IW