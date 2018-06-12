const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./hypermiler.db', (err) => {
    if (err){
        console.log(err);
    }
    console.log("Connected to database");
});

db.all("SELECT year, make, model, comb_mpg FROM vehicles WHERE id = 3600;", function(err, result){
    if (err){
        console.log(err);
    }
    console.log(result);
});

db.close();