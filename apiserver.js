const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const passport = require('passport');
const request = require('request');
const parseString = require('xml2js').parseString;

const app = express();

//====EXPRESS CONFIG====//
app.use(cors());
app.use(bodyparser.urlencoded({"extended": true}));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    console.log("Request received.");
    res.send("Received");
});

//===API CONFIG===//
var zillow_api_call = function(address, citystatezip){
   return 'https://www.zillow.com/webservice/GetSearchResults.htm?zws-id=' + process.env.ZILLOW_ID + '&address=' + address + '&citystatezip=' + citystatezip;
    
}

//====ROUTES====//
app.get('/search', (req, res) => {
    console.log(req.query.value);
    request(
        zillow_api_call("191+Rainbow+Trail", "06066"),
        function(err, response){
            if (err) {
               console.log("Error: " + err);
            }
        //Zillow's API response is in XML and is a pain to handle
        parseString(response.body, function(err, result){
            if (err) throw err;
            const parsedResponse = {
                latitude: Number(result["SearchResults:searchresults"].response["0"].results["0"].result["0"].address["0"].latitude[0]),
                longitude: Number(result["SearchResults:searchresults"].response["0"].results["0"].result["0"].address["0"].longitude[0]),
                street_address: result["SearchResults:searchresults"].response["0"].results["0"].result["0"].address["0"].street,
                zipcode: result["SearchResults:searchresults"].response["0"].results["0"].result["0"].address["0"].zipcode,
                zestimate: result["SearchResults:searchresults"].response["0"].results["0"].result["0"].zestimate["0"].amount["0"]._,
                zpid: result["SearchResults:searchresults"].response["0"].results["0"].result["0"].zpid["0"]
            }
            res.send(parsedResponse);
        })
    })
})





app.listen(3000, console.log("Listening on port 3000"));