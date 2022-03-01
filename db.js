const {Sequelize, STRING} = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealer_choice_react')

const Zoos = sequelize.define('zoos', {
	name: {
		type: STRING
	}
})

const Animals = sequelize.define('animals', {
	name: {
		type: STRING
	}
})

Zoos.hasMany(Animals)
Animals.belongsTo(Zoos)

const seedAndSync = async() => {
		await sequelize.sync({force: true})

		const sanDiego = await Zoos.create({name: 'San Diego Zoo, San Diego, USA'})
		const bronxZoo = await Zoos.create({name: 'Bronx Zoo, New York City, USA'})
		const tarongaZoo = await Zoos.create({name: 'Taronga Zoo, Sydney, Australia'})
		const chesterZoo = await Zoos.create({name: 'Chester Zoo, England, UK'})
		const wellingtonZoo = await Zoos.create({name: 'Wellington Zoo, Wellington, New Zealand'})
		const torontoZoo = await Zoos.create({name: 'Toronto Zoo, Toronto, Canada'})
		const welshMountainZoo = await Zoos.create({name: 'Welsh Mountain Zoo, North Wales, UK'})
		const pragueZoo = await Zoos.create({name: 'Prague Zoo, Prague, Czechia'})

		await Animals.create({name: 'Babirusa', zooId: sanDiego.id})
		await Animals.create({name: 'Anaconda', zooId: sanDiego.id})
		await Animals.create({name: 'White Rhinos', zooId: bronxZoo.id})
		await Animals.create({name: 'Giant Aldabra Tortoise', zooId: bronxZoo.id})
		await Animals.create({name: 'Indian Gharial', zooId: bronxZoo.id})
		await Animals.create({name: 'Cheetahs', zooId: tarongaZoo.id})
		await Animals.create({name: 'Sumatran Tigers', zooId: tarongaZoo.id})
		await Animals.create({name: 'Tree Kangaroos', zooId: tarongaZoo.id})
		await Animals.create({name: 'Aye-ayes', zooId: chesterZoo.id})
		await Animals.create({name: 'Sifakas', zooId: chesterZoo.id})
		await Animals.create({name: 'Bongo', zooId: chesterZoo.id})
		await Animals.create({name: 'Blue Viper', zooId: chesterZoo.id})
		await Animals.create({name: 'Malayan Sun Bear', zooId: wellingtonZoo.id})
		await Animals.create({name: 'Pelican', zooId: wellingtonZoo.id})
		await Animals.create({name: 'Little Blue Penguins', zooId: wellingtonZoo.id})
		await Animals.create({name: 'Secretary birds', zooId: torontoZoo.id})
		await Animals.create({name: 'ground-dwelling hornbills', zooId: torontoZoo.id})
		await Animals.create({name: 'Yaks', zooId: torontoZoo.id})
		await Animals.create({name: 'Nicobar pigeon', zooId: torontoZoo.id})
		await Animals.create({name: 'Margay', zooId: welshMountainZoo.id})
		await Animals.create({name: 'Red-faced Spider Monkey', zooId: welshMountainZoo.id})
		await Animals.create({name: 'Kašík', zooId: pragueZoo.id})
		await Animals.create({name: 'Polar Bear', zooId: pragueZoo.id})
		await Animals.create({name: 'Great Indian hornbill', zooId: pragueZoo.id})
}


module.exports = {
	seedAndSync,
	models : {
		Zoos,
		Animals
	}
}