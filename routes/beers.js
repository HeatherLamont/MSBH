const express = require('express')
const router = express.Router()
const Beer = require('../models/beer')
const Brewery = require('../models/brewery')
const multer = require('multer')
const path = require('path')
const uploadPath = path.join('public', Beer.beerLogoBasePath)
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif']
const upload = multer({
    dest:uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

//All Beers Route
router.get('/',  async (req, res)=>{
  res.send('All Beers')
})

//New Beer Route
router.get('/new', async (req, res)=>{
   renderNewPage(res, new Beer())
})

//Create Beer
router.post('/', upload.single('logo'), async (req, res)=>{
   const fileName = req.file != null ? req.file.filename : null
  const beer = new Beer({
    beer_name: req.body.beer_name,
    brewery: req.body.brewery,
    ABV: req.body.ABV,
    price: req.body.price,
    description: req.body.description,
    beer_logo: fileName
  })

  try {
    const newBeer = await beer.save()
    //  res.redirect(`beers/${newBeer.id}`)
    res.redirect('beers')  
} catch {
    renderNewPage(res, beer, true)
  }

})

async function renderNewPage(res, beer, hasError = false){
    try {
        const breweries = await Brewery.find({})
        const params = {
            breweries: breweries,
            beer: beer
        }
        if (hasError) params.errorMessage = 'Error Creating Beer'
        const beer = new Beer()
        res.render('beers/new', params)
    } catch {
        res.redirect('/beers')
    }
}

module.exports = router

