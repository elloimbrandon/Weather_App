const request = require('postman-request')



const forcast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=60a44bd8c2c3ad047e9d2b33954231aa&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true }, (error, response) => { 
    const {error: responseError, weather_descriptions, temperature, feelslike, humidity} = response.body.current
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (responseError) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out.' + 
            ' It feels like ' + feelslike + ' degrees out.' + ' With a humidity of ' + humidity + '%.')
        }
    })
}

module.exports = forcast