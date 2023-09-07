const mongoose = require('mongoose')
require('dotenv').config({ path: process.env.DOTENV_CONFIG_PATH })
//Preguntar a Numan
mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => console.log('Connected to MongoDB'))
