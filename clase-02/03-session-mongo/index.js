import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express()

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/session-mongo',
        collectionName: 'sessions',
        ttl: 5,
    }),
    secret: 'codersecret',
    resave: true,
    saveUninitialized: true,
}))

app.use(express.json())

app.get('/', (req, res) => {
    if (!req.session.contador) {
        req.session.contador = 1
        req.session.nombre = req.query.nombre || 'Anakin'
        res.send(`Hello there, ${req.session.nombre}`)
    } else {
        req.session.contador++
        res.send(`Hello again, ${req.session.nombre}, numero de veces que entraste: ${req.session.contador}`)
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('error al cerrar sesion')
        }

        res.send('sesion cerrada correctamente')
    })
})

const PORT = 8080

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})