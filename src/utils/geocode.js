const request = require('request')

const geocode = (address, callback) => {
    const geoCodeUrlPrefix = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const geoCodeUrlSuffix =    '.json?access_token=pk.eyJ1Ijoic2hlbWxhciIsImEiOiJjanl5OWIwZ2oxZjB6M2NycjU0eW1qbmMwIn0.IX-rjPcoic4fOzrarpqdLQ&limit=1'
    const encodedAddress = encodeURIComponent(address)
    const geoCodeUrl = geoCodeUrlPrefix+encodedAddress+geoCodeUrlSuffix
    // console.log("geoCodeUrl: "+geoCodeUrl)
    request({url : geoCodeUrl, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service',undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find matching results for location. Try another search',undefined)
        } else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const location = body.features[0].place_name;
            const data = {
                latitude,
                longitude,
                location
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode