const request = require("request")

const forecast = (lat, long, callback) => {
    var url = 'http://api.weatherstack.com/current?access_key=94667323555451919b33640bfcd49b34&query='+lat+','+long

    request({ url, json: true}, (error, response) => {
        if(error) {
            callback("Unable to connect to weather service")
        } else if(response.body.error){
            callback("Unable to find location")     
        }
        else{

            var{temperature: currentTemp, feelslike} = response.body.current

            var summary = "It is currently " + currentTemp + " degrees out. It feels like " + feelslike + " degrees out"
            callback(undefined, summary)
        }
    
    })



}

module.exports = forecast