const express = require("express");

var app = express();

// get() allows us to set handler for get requests
app.get("/", (req, res) => {
    // res.send("Hello express");
    res.send({
        name: "Fernando",
        likes: [
            "Guitar",
            "Music"
        ]
    });
});

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "This is bad, man"
    });
});

app.listen(3000);