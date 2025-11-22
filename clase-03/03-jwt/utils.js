import jwt from 'jsonwebtoken'

const PRIVATE_KEY = 'coderhouse-12310238710928471-29834712'

export const generateToken = (user) => {
    return jwt.sign({...user}, PRIVATE_KEY, { expiresIn: '1h' })
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ error: 'no token' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, PRIVATE_KEY, (err, credentials) => {
        if (err) {
            return res.status(403).json({ error: 'incorrect token'})
        }

        req.user = credentials.user
        next()
    })
}