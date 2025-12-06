import express from 'express'

const app = express()

const router = express.Router()

const pets = []

router.param('pet', (req, res, next, petName) => {
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!nameRegex.test(petName)) {
        return res.status(400).send('invalid pet name')
    }

    const foundPet = pets.find(p => p.name.toLowerCase() === petName.toLowerCase())
    if (!foundPet) {
        return res.status(404).send('pet not found')
    }

    req.pet = foundPet
    next()
})

router.post('/', (req, res) => {
    const { name, specie } = req.body
    if (!name || !specie) {
        return res.status(400).send('invalid data')
    }

    const pet = pets.find(p => p.name.toLowerCase() === name.toLowerCase())
    if (pet) {
        return res.status(400).send('already exists')
    }

    pets.push({name, specie})

    res.status(201).send('created!')
})

router.get('/)', (req, res) => {
    res.json(pets)
})

router.get('/:pet)', (req, res) => {
    res.json(req.pet)
})

router.put('/:pet', (req, res) => {
    req.pet.adopted = true

    // update

    res.json('updated!')
})

app.use('/api/pets', router)

app.listen(8080, () => {
    console.log('escuchando en 8080')
})