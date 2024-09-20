const mongoose = require('mongoose')

const beerLogoBasePath = 'uploads/beerLogos'

const beerSchema = new mongoose.Schema({
    beer_name:{
        type: String,
        required: true
    },
    brewery:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Brewery'
    },
    ABV:{
        type: Number,
        required: true
    },
    Style:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required: true
    },
    beer_logo:{
        type: String,
        required: true
    },
    description:{
        type: String
    }

})

module.exports = mongoose.model('Beer', beerSchema)
module.exports.beerLogoBasePath = beerLogoBasePath