const express = require('express')
const brewery = require('../models/brewery')
const router = express.Router()
const Brewery = require('../models/brewery')

//All Breweries Route
router.get('/',  async (req, res)=>{
    let searchOptions = {}
    if (req.query.brewery_name != null && req.query.brewery_name !== ''){
        searchOptions.brewery_name = new RegExp(req.query.brewery_name, 'i')
    }
    try {
        const breweries = await Brewery.find(searchOptions)
        res.render('breweries/index', {
            breweries: breweries,
        searchOptions: req.query
    })

    } catch {
        res.redirect('/')
    }
})

//New Brewery Route
router.get('/new', (req, res)=>{
    res.render('breweries/new', { brewery: new Brewery })
})

//Create brewery
router.post('/', async (req, res)=>{
    const brewery = new Brewery({
        brewery_name: req.body.brewery_name,
        brewery_city: req.body.brewery_city
    })
    try{
       const newBrewery = await brewery.save()
            //  res.redirect(`breweries/${newBrewery.id}`)
            res.redirect('breweries')
    }catch{
        res.render('breweries/new', 
            {brewery: brewery, errorMessage: 'Error Creating Brewery'})
    }
})

module.exports = router

