const express = require('express')
const router = express.Router()

const {
    Dish
} = require('../models')

router.get('/', async function (req, res) {
    const dishes = await Dish.find()
    res.send({
        status: 200,
        message: dishes
    })
    res.end()
})

router.get('/:id', async function (req, res) {
    const id = req.params.id
    const dish = await Dish.findById(id)
    if (!dish) {
        res.send({
            status: 404,
            message: "Dish not found!"
        })
    }
    res.send({
        status: 200,
        message: dish
    })
    res.end()
})

router.delete('/:id', async function (req, res) {
    const id = req.params.id
    const dish = await Dish.findByIdAndDelete(id)
    if (!dish) {
        res.send({
            status: 404,
            message: "Dish not found!"
        })
    }
    res.send({
        status: 200,
        message: "Dish deleted!"
    })
    res.end()
})

router.put('/:id', async function (req, res) {
    const id = req.params.id
    const body = req.body
    if (!id || !body) return res.send({
        status: 400,
        message: "data missing"
    }).end()

    const dishUpdated = await Dish.findByIdAndUpdate(id, body, {
        new: true
    }, (err) => {
        if (err) {
            res.send({
                status: 404,
                message: "dish not found"
            }).end()
        }
    })
    if (!dishUpdated) {
        res.send({
            status: 500,
            message: "Server error"
        }).end()
    }
    res.send({
        status: 200,
        message: dishUpdated
    }).end()

})

router.post('/', async function (req, res) {

    const {
        name,
        type,
        description
    } = req.body

    if (!name || !type || !description) return res.send({
        status: 400,
        message: "data missing"
    }).end()
    const dish = new Dish({
        name,
        type,
        description
    })
    const newDish = await dish.save()
    if (!newDish) {
        res.send({
            status: 500,
            message: "Server error"
        }).end()
    }
    res.send({
        status: 200,
        message: newDish
    }).end()
})

module.exports = router
