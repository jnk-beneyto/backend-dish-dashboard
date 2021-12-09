const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DishSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Dish', DishSchema)