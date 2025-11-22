import express from 'express'
import bcrypt from 'bcrypt'

const users = []

const app = express()
app.use(express.json())

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

app.post('/login', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json('falta algun dato')
    }

    const user = users.find(u => u.username == username)
    if (!user) {
        return res.status(404).json('no existe ese username')
    }

    if (!isValidPassword(user, password)) {
        return res.status(401).json('password incorrecta')
    }

    res.status(200).json('logueado correctamente')
})

app.post('/register', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json('falta algun dato')
    }

    const user = users.find(u => u.username == username)
    if (user) {
        return res.status(400).json('ya existe ese username')
    }

    const hashedPassword = createHash(password)
    console.log(password, hashedPassword)
    users.push({username, password: hashedPassword})

    res.status(201).json('creado correctamente')
})

app.get('/users', (req, res) => {
    res.json(users)
})

app.listen(8080, () => {
    console.log('escuchando')
})

// patolucas $2b$10$eH.TbLOXRScb6qmAFZ8koutpnjc/t3TsLLuwFXtQpBoKvodz3HZ/.
// patolucas $2b$10$FAhLZ5OrDhhH66ZQ8ydyLOXAhbKA5HLKb4PxQPyoK7laAXBBqq3yq
// coderhouse123456!!!!! $2b$10$lJaBHdpInxL/AGUzmO8W/Oc8Yp8QZyFmiRAs96G5BJTm62qUe9j66