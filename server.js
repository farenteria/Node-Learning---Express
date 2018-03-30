const express = require("express");
const hbs = require("hbs");
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

// allows us to use this function within hbs files given the first name 
hbs.registerHelper("getCurrentYear", () =>{
    return new Date().getFullYear()
});

hbs.registerHelper("screamIt", (text) =>{
    return text.toUpperCase()
});

// get() allows us to set handler for get requests
app.get("/", (req, res) => {
    res.render("home.hbs",{
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to the coolest page",
    });
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page",
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "This is bad, man"
    });
});

app.listen(3000, () => {
    console.log("Server is up");
});