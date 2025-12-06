import express from 'express'

const app = express()

const router = express.Router()

router.get('/:nombre([a-zA-Z%C3%A1]+)', (req, res) => {
    const { nombre } = req.params

    res.send(`Hello, ${nombre}`)
})

router.get('*', (req, res) => {
    res.status(400).send('No existe o param invalido')
})

app.use('/api', router)

app.listen(8080, () => {
    console.log('escuchando en 8080')
})