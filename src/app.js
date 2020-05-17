const express = require("express")
const path = require("path")
const hbs = require("hbs")
const forecast = require("./utils/forecast.js")
const geocode = require("./utils/geocode.js")
const app = express()
const port = process.env.PORT || 3000

//define paths for express
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get("/", (req, res) => {

    res.render("index", {
        title:"Weather App",
        name: "Ryan Potter"
    })
})

app.get("/about", (req, res) =>{

    res.render("about", {
        title:"About Me",
        name: "Ryan Potter"
    })
})

app.get("/help", (req, res) =>{

    res.render("help", {
        title:"Help section",
        name: "Ryan Potter",
        message: "This is the help page"
    })
})

app.get("/products", (req, res) =>{
    console.log(req.query);

    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get("/weather", (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "An address must be provided"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{
       

        if(error){
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }

            return res.send({
                location,
                forecastData
            })
           
        })
    })


})

app.get("/help/*", (req, res) =>{

    res.render("404", {
        title:"404 not found",
        name: "Ryan Potter",
        message: "No sub pages found for help"
    })
})

app.get("*", (req, res) =>{

    res.render("404", {
        title:"404 not found",
        name: "Ryan Potter",
        message: "Page not found"
    })
})

app.listen(port, () =>{

    console.log("Server is up on port " + port)

})