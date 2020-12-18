const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../database')

router.post('/register', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const user = await User.create(req.body)
        res.json(user)
    } catch(e) {
        console.log(e)
        res.status(422).json({ error: 'Email duplicado' })
    }
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } })

    if (user) {
        const passValid = await bcrypt.compare(req.body.password, user.password)

        if (passValid) {
            const token = jwt.sign({
                id: user.id,
                username: user.username
            }, 'mi-secreto', { expiresIn: 60 * 2 })

            res.json({ token })
        } else {
            res.status(401).json({ error: 'Credenciales invalidas'})
        }
    } else {
        res.status(401).json({ error: 'Credenciales invalidas'})
    }
})

module.exports = router