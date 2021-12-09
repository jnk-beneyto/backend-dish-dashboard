//ENDPOINT TESTING

const app = require('./../../server')
const {
    PORT
} = require("./../../config")

app.listen(PORT)

const supertest = require('supertest')
const request = supertest(app)
const {
    Dish
} = require('./../../models/index')

describe('Checking endpoints', () => {
  
  beforeAll(async () => {
    await Dish.deleteMany({})
  })
  
    it('gets the home endpoint', async () => {
        const response = await request.get('/')
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Welcome aboard!')
    })

    it('Should POST dish to database', async () => {
        const res = await request.post('/dish')
            .send({
                name: 'lentils',
                type: 'main',
                description: 'awesome lentils'
            })
    })

    it('Should have dish saved in database', async () => {
        const dish = await Dish.findOne({
            name: 'lentils'
        })
        expect(dish.name).toBeTruthy()
        expect(dish.type).toBeTruthy()
        expect(dish.description).toBeTruthy()
    })

    it('Should GET dish saved from database', async () => {
        //fetching dish 
        const dish = await Dish.findOne({
            name: 'lentils'
        })
        //deleting dish
        const DishFetched = await request.get(`/dish/${dish._id}`)
        expect(DishFetched.body.message.type).toBe('main')
    })

    it('Should UPDATE test dish from database', async () => {
        //fetching dish 
        const dish = await Dish.findOne({
            name: 'lentils'
        })
        //updating dish
        const DishUpdated = await request.put(`/dish/${dish._id}`)
            .send({
                name: 'nameChanged',
            })
        expect(DishUpdated.body.message.name).toBe('nameChanged')
    })

    it("Should get more than 0 dishes", async () => {
        const dishes = await Dish.find({})
        expect(dishes.length).toBeGreaterThan(0)
    })

    it('Should DELETE one dish from database', async () => {
        //fetching dish 
        const dish = await Dish.findOne({
            name: 'nameChanged'
        })
        //deleting dish
        const DishDeleted = await request.delete(`/dish/${dish._id}`)
        expect(DishDeleted.status).toBe(200)
    })

    it('gets the 404 for unknown endpoint', async () => {
        const response = await request.get('/unknown')
        expect(response.body.status).toBe(404)
        expect(response.body.message).toBe('Not found!')
    })

})