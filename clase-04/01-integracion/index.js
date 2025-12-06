import express from 'express'
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import apiUsersRouter from './src/routes/user.router.js'
import viewsRouter from './src/routes/views.router.js'

import connectDB from './src/config/db.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('./public'))

// handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', 'views')

// rutas
app.use('/users', apiUsersRouter)
app.use('/', viewsRouter)

// mongo y server
const PORT = process.env.PORT || 3000
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`escuchando en el puerto: ${PORT}`)
    })
})