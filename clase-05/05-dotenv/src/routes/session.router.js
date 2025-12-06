import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

const users = [
    { email: 'a@a', password: 'a', role: 'ADMIN'},
    { email: 'u@u', password: 'u', role: 'USER'}
]

router.post('/login', (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).send('bad request')
    }

    const user = users.find(u => u.email === email && u.password === password)
    if (!user) {
        return res.status(404).send('user not found')
    }

    const token = jwt.sign({ email: user.email, role: user.role}, 'coderhouse')

    res.cookie('jwt', token).send('logged!')
})

export default router

// tarea en casa crear como custom Router
//export class SessionRouter extends Router {}