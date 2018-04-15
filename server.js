const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

// middleware
// next tells us when function is done
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    // newer versions of node require error callback
    fs.appendFile("server.log", log + "\n", (err) => {
        if(err){
            console.log("Unable to append to server.log");
        }
    });

    next(); // necessary to use for application to continue
});

// app.use((req, res, next) => {
//     res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

// allows us to use this function within hbs files given the first name 
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear()
});

hbs.registerHelper("screamIt", (text) => {
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