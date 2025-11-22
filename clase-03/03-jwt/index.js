import express from 'express'

import { generateToken, authToken } from './utils.js'

const app = express()

const users = [
    { username: 'marcos', rol: 'user', dni: '1234' }
]

app.post('/login/:username', (req, res) => {
    const username = req.params.username

    const user = users.find(u => u.username == username)


    const token = generateToken(user)

    res.cookie('jwt', token)

    res.json({ token })
})

app.get('/protected', authToken, (req, res) => {
    res.json({ message: 'estas logueado!'})
})

app.listen(8080, () => {
    console.log('escuchando')
})