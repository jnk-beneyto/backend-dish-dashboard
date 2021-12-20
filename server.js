const helmet = require('helmet')
const mongoose = require('mongoose')
const cors = require('cors')
const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const {
    DB
} = require("./config")
const {
    DishRoutes
} = require("./routes")


//middlewares
app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
mongoose.Promise = global.Promise

//Welcoming route

app.get('/', function (req, res) {
    res.send({
        status: 200,
        message: "Welcome aboard!"
    })
    res.end()
})

//routing

app.use('/dish', DishRoutes)

//uknown url 

app.get('*', function (req, res) {
    res.send({
        status: 404,
        message: "Not found!"
    })
    res.end()
})

//db conection

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(
    err => console.log("error " + err.message)
)

module.exports = app