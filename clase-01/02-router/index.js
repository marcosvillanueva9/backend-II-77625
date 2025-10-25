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

const routerUsuarios = express.Router()

routerUsuarios.use(mid1)

routerUsuarios.get('/', (req, res) => {
    console.log(req.data)
    res.send(usuarios)
})

routerUsuarios.post('/', (req, res) => {
    // TODO
    res.send('creado')
})

app.use('/api/usuarios', routerUsuarios)

app.get('/test', () => {
    console.log('test')
})

app.listen(PORT, () => {
    console.log(`escuchando en el ${PORT}`)
})