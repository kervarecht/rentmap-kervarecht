const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const NodeGeocoder = require('node-geocoder');
const passport = require('passport');
const parseString = require('xml2js').parseString;
const request = require('request');
const sqlite3 = require('sqlite3').verbose();

const app = express();

//====EXPRESS CONFIG====//
app.use(cors());
app.use(bodyparser.urlencoded({"extended": true}));
app.use(bodyparser.json());


//===SQL DB CONFIG===//
var db = new sqlite3.Database('./hypermiler.db', (err) => {
    if (err){
        console.log(err);
    }
    console.log("Connected to database");
});


//===ZILLOW API CONFIG===//
var zillow_api_call = function(address, citystatezip){
   return 'https://www.zillow.com/webservice/GetSearchResults.htm?zws-id=' + process.env.ZILLOW_ID + '&address=' + address + '&citystatezip=' + citystatezip;
    
}

//===NODE GEOCODER CONFIG===//
const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GOOGLE_GEO_API_KEY,
    formatter: null
}
const geocoder = NodeGeocoder(options);

//===myGasFeed CONFIG===//
const getPrice = function(coordinates, fuel_type){
    console.log(fuel_type);
    let type;
    if (fuel_type.includes("Regular")){
        type = 'reg';
    }
    else if (fuel_type.includes("Premium")){
        type = "pre";
    }
    else if (fuel_type.includes("Diesel")){
        type = "diesel";
    }
    else if (fuel_type.includes("Midgrade")){
        type = "mid";
    }
    return 'http://api.mygasfeed.com/stations/radius/' + coordinates[0] + '/' + coordinates[1] + '/5/' + type + '/distance/' + process.env.MY_GAS_FEED_API_KEY + '.json?';
}

//====ROUTES====//
app.get('/search', (req, res) => {
    //Separation of concerns vs efficiency, how many API calls in this route
    //vs send back to front-end and push Zillow API request from there?

    //Query Google geocoder
    geocoder.geocode(req.query.address, function(err, geo){
        if (err){
            console.log(err)
        }
        console.log(geo);
        const address = geo[0].streetNumber + " " + geo[0].streetName;
        const zipcode = geo[0].zipcode
        //query Zillow API with Google Geocoder response
        request(
            zillow_api_call(address, zipcode),
            function(err, response){
                if (err) {
                   console.log("Zillow API call error: " + err);
                }
            //Zillow's API response is in XML and is a pain to handle
            //If Zillow returns no data function sends an error message + Google Geo data
            //So the app can still route to the requested property
            parseString(response.body, {explicitArray: false}, function(err, result){
                if (err) {
                    console.log(err);
                }
                let zestimate;
                let zpid;
                console.log(result);
                if (result["SearchResults:searchresults"].response){
                    zestimate = result["SearchResults:searchresults"].response.results.result.zestimate.amount._ ? result["SearchResults:searchresults"].response.results.result.zestimate.amount._ : "Estimate not found.";
                    zpid = result["SearchResults:searchresults"].response.results.result.zpid ? result["SearchResults:searchresults"].response.results.result.zpid : "ID not found";
                }
                else {
                    zestimate = "Estimate not found";
                    zpid = "ID Not found";
                }
                const parsedResponse = {
                    latitude: Number(geo[0].latitude),
                    longitude: Number(geo[0].longitude),
                    street_address: geo[0].formattedAddress,
                    zipcode: geo[0].zipcode,
                    zestimate: zestimate,
                    zpid: zpid
                }
                for (var x in parsedResponse){
                    if (parsedResponse[x] == undefined){
                        parsedResponse[x] = null;
                    }
                }
                res.send(parsedResponse);
            })
        })
    });
    
});

app.get('/destination', (req, res) => {
    console.log("request received!");
    geocoder.geocode(req.query.destination, function(err, response){
        if (err){
            console.log(err)
        }
        console.log(response);
        res.send(response);
    })

});

app.get('/vehicle', (req, res) => {
    const make = req.query.make;
    const year = req.query.year;
    const sqlFunction = "SELECT model, fuel_type FROM vehicles WHERE year = " + year + " AND make = \"" + make + "\"GROUP BY model";
    db.all(sqlFunction, function(err, result){
        if (err){
            console.log(err);
        }
        console.log(result);
        res.send(result);
    });
});

app.get('/fuelprice', (req, res) => {
    const coordinates = req.query.coordinates;
    const fuel_type = req.query.fuel_type;
    
    if (!coordinates || !fuel_type){
        res.send(false);
    }
    else {
        console.log(getPrice(coordinates, fuel_type));
        request(getPrice(coordinates, fuel_type), function(err, response){
            if (err){
                console.log("Err: " + err);
            }
            console.log(response);
            res.send(response)
        })
    }
})

app.get('/mpgdata', (req, res) => {
    const make = req.query.make;
    const year = req.query.year;
    const model = req.query.model;
    console.log(make, year, model);

    const sqlFunction = "SELECT ROUND(AVG(comb_mpg), 0) AS comb_mpg, fuel_type FROM vehicles WHERE year = " + year + " AND model = \"" + model + "\" AND make = \"" + make + "\";";

    db.all(sqlFunction, function(err, result){
        if (err){
            console.log(err);
        }
        console.log(result);
        res.send(result[0]);
    })
})

app.listen(3000, console.log("Listening on port 3000"));