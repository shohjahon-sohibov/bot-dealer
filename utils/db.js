require('dotenv').config()
const mongoose = require('mongoose')
require('../models/Product')

const mongo = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch(err) {
        console.log(err.message)
    }
}

module.exports = mongo