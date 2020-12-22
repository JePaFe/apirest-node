const router = require('express').Router()
const { checkToken } = require('../middleware/checkToken')
const { body, validationResult } = require('express-validator')

const { Categoria } = require('../database')

router.get('/', async (req, res) => {
    const categorias = await Categoria.findAll()
    res.json(categorias)
})

router.get('/:id', async (req, res) => {
    const categoria = await Categoria.findOne({ where: { id: req.params.id }})
    res.json(categoria)
})

router.post('/', checkToken, [
    body('nombre').isLength(3).withMessage('El campo es obligatorio y tiene que tener mas de 3 caracteres')
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.json(errors.array())
    }

    const categoria = await Categoria.create(req.body)
    res.json(categoria)
})

router.put('/:id', checkToken, async (req, res) => {
    const result = await Categoria.update(req.body, { where: { id: req.params.id } })
    res.json(result)
})

router.delete('/:id', checkToken, async (req, res) => {
    const result = await Categoria.destroy({ where: { id: req.params.id } })
    res.json(result)
})

module.exports = router