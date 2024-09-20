const mongoose = require('mongoose')

const brewerySchema = new mongoose.Schema({
    brewery_name:{
        type: String,
        required: true
    },
    brewery_city:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Brewery', brewerySchema)