const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

const Cat = mongoose.model('Cat', { name: String })

const kitty = new Cat({ name: 'Picky' })
kitty.save().then(() => console.log('meow'))
