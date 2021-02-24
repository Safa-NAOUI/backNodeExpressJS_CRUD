var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:2727/DB", function (err, db) {
   
     if(err) throw err;

     //Write databse Insert/Update/Query code here..
                
});