const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

// for parsing application/json
app.use(express.json())

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
    let token = req.get('token')

    jwt.verify(token, 'mi-secreto', (error, decoded) => {
        if (error) {
            return res.status(401).json({ error })
        }

        next()
    })
}, (req, res) => {
    console.log(req.params)
    res.send('OK')
})

app.use('/api/users', require('./routes/users'))

app.listen(3000, () => console.log('*:3000'))