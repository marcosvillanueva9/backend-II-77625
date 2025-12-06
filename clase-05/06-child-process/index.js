import express from 'express'
import { fork } from 'child_process'

const app = express()
const PORT = 8080

let visitas = 0

app.get('/', (req, res) => {
    res.send(visitas++)
})

app.get('/bloq', (req, res) => {
    let suma = 0
    for (let i = 0; i < 5e9; i++) {
        suma++
    }
    res.send(`la suma bloqueante es: ${suma}`)
})

app.get('/no-bloq', (req, res) => {
    const child = fork('./sumador.js')

    child.send('iniciar')

    child.on('message', suma => {
        res.send(`la suma no bloqueante es: ${suma}`)
    })
})

app.listen(PORT, () => {
    console.log('escuchando')
})