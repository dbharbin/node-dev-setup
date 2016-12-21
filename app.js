var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

var linaroTerms = [
    {
        term: "LSK",
        defined: "Linaro Stable Kernel: A great starting point for your development"
    },
    {
        term: "DevCloud",
        defined: "An ARM-based server cloud using OpenStack to manage resource provisioning."
    },
    {
	term: "96Boards",
	defined: "An Open Source hardware specification for developing ARM-based hardware development platforms."
    },
    {
	term: "LDTS",
	defined: "Linaro Developer Technical Support - Get expert help on Linaro technologies."
    },
    {
	term: "Linaro Downloads",
	defined: "Go to http://www.linaro.org/downloads/ to get the lates builds from Linaro."
    },
    {
        term: "LAVA",
        defined: "Linaro Automated Validation Architecture:  An Open Source Test Automation Framework(TAF) by Linaro."
    }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();
});

app.use(express.static("./public"));

app.use(cors());

app.get("/dictionary-api", function(req, res) {
	res.json(linaroTerms);
});

app.post("/dictionary-api", function(req, res) {
    linaroTerms.push(req.body);
    res.json(linaroTerms);
});

app.delete("/dictionary-api/:term", function(req, res) {
    linaroTerms = linaroTerms.filter(function(definition) {
        return definition.term.toLowerCase() !== req.params.term.toLowerCase();
    });
    res.json(linaroTerms);
});

app.listen(3000);

console.log("Linaro Dictionary running on port 3000");

module.exports = app;
