const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const NodeGeocoder = require('node-geocoder');
const passport = require('passport');
const parseString = require('xml2js').parseString;
const request = require('request');


const app = express();

//====EXPRESS CONFIG====//
app.use(cors());
app.use(bodyparser.urlencoded({"extended": true}));
app.use(bodyparser.json());


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


//====ROUTES====//
app.get('/search', (req, res) => {

    request(
        zillow_api_call(req.query.address, req.query.zip),
        function(err, response){
            if (err) {
               console.log("Error: " + err);
            }
        console.log(response);
        //Zillow's API response is in XML and is a pain to handle
        parseString(response.body, {explicitArray: false}, function(err, result){
            if (err) {
                console.log(err);
            }
            const parsedResponse = {
                latitude: Number(result["SearchResults:searchresults"].response.results.result.address.latitude),
                longitude: Number(result["SearchResults:searchresults"].response.results.result.address.longitude),
                street_address: result["SearchResults:searchresults"].response.results.result.address.street,
                zipcode: result["SearchResults:searchresults"].response.results.result.address.zipcode,
                zestimate: result["SearchResults:searchresults"].response.results.result.zestimate.amount._,
                zpid: result["SearchResults:searchresults"].response.results.result.zpid
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





app.listen(3000, console.log("Listening on port 3000"));