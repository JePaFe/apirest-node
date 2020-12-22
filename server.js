const express = require('express')
const app = express()
const { checkToken } = require('./middleware/checkToken')

// for parsing application/json
app.use(express.json())

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

app.get('/', checkToken, (req, res) => {
    console.log(req.params)
    res.send('OK')
})

app.use('/api/users', require('./routes/users'))
app.use('/api/categorias', require('./routes/categorias'))

app.listen(3000, () => console.log('*:3000'))