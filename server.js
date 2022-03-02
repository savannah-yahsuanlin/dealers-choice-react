const path = require('path')
const express = require('express')
const {seedAndSync, models: {Zoos, Animals}} = require('./db')

const app = express()

app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public')))
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))


app.get('/api/zoos', async(req, res, next) => {
	try {
		res.send(await Zoos.findAll({include: [Animals]}))
	} catch (error) {
		next(error)
	}
})

app.post('/api/zoos', async(req, res, next) => {
	try {
		await Zoos.create(req.body)
		res.sendStatus(201)
	} catch (error) {
		next(error)
	}
})

app.delete('/api/zoos/:id', async(req, res, next) => {
	try {
		const zoo = await Zoos.findByPk(req.params.id)
		await zoo.destroy()
		res.sendStatus(204)
	} catch (error) {
		next(error)
	}
})

Zoos.hasMany(Animals)
Animals.belongsTo(Zoos)

const setUp = async() => {
	try {
		await seedAndSync()
		const port = process.env.PORT || 1338
		app.listen(port, ()=> {console.log(`Listening on port ${port}`)})
	} catch (error) {
		console.log(error)
	}
}

setUp()