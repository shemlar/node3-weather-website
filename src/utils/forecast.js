const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const forecastUrlPrefix = 'https://api.darksky.net/forecast/cac11e7dae59eb992ae77b90a759046c/'
    const forecastUrlSuffix = '?units=si'
    const forecastUrl = forecastUrlPrefix+latitude+','+longitude+forecastUrlSuffix
    request({url : forecastUrl, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            const temperature = body.currently.temperature;
            const precipProbability = body.currently.precipProbability;
            const summary = body.daily.data[0].summary;
            const data = {
                temperature,
                precipProbability,
                summary
            }
            callback(undefined, data)
        }
    })
}
//


module.exports = forecast