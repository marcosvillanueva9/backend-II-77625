import express from 'express'

const app = express()
const PORT = 8080

const usuarios = [
    { nombre: 'Fernando', apellido: 'Ojeda' },
    { nombre: 'Luciano', apellido: 'Galeano' }
]

function mid1(req, res, next) {
    req.data = 'hola'
    next()
}

app.use(mid1)

app.get('/api/usuarios', (req, res) => {
    console.log(req.data)
    res.send(usuarios)
})

app.post('/api/usuarios', (req, res) => {
    // TODO
    res.send('creado')
})

app.listen(PORT, () => {
    console.log(`escuchando en el ${PORT}`)
})