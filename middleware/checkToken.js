const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
    let token = req.get('token')

    jwt.verify(token, 'mi-secreto', (error, decoded) => {
        if (error) {
            return res.status(401).json({ error })
        }

        next()
    })
}

module.exports = {
    checkToken
}