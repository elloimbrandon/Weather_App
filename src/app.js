const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const forcast = require('./utils/forecast')
//const {response} = require('express')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // tells express to use this path for handlebars templates
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // initialize handlebars in the backround with express (template)
app.set('views', viewsPath) // pointing to certain directory
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// req = request, res = response
// send json


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        // using return instead of else statement so that we dont send a response twice if theirs and error
        return res.send({
            error: 'You must provide a valid address'
        })
    }
    // setup a default object incase of error ex. = {}
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { 
        if (error) {
            return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('', (req, res) => { // express go's and gets the file, converts to html and sent back to requester
    res.render('index', {
        title: 'Weather App',
        name: 'Brandon'
    }) 
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Brandon'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'help',
        name: 'Brandon',
        message: 'This is the help page.'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brandon',
        errorMessage: 'Artical not found.'
    })
    // res.send('help article not found')
})

app.get('*', (req, res) => { // 404 page using wildcard if it didnt match before
    res.render('404', {
        title: '404',
        name: 'Brandon',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})