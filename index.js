const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());


var corsOptions = {
    //origin: "http://localhost:4200"
    origin: "*"
  };

app.use(cors(corsOptions));

// put the server to listen (on) on port 85
app.listen(
    85,
    ()=>{console.log("Express server listening on port 85");}
);

// connect our server to the Mongo database
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'androiddb'; // name of database 


let db 

MongoClient.connect(url, function(err, client) {
 console.log("Successful connection with MongoDB");
 db = client.db(dbName);
});

// list of equipe
app.get('/equipes', (req,res) => {
      db.collection('equipes').find({}).toArray(function(err, docs) {
          if (err) {
              console.log(err)
              throw err
          }
          res.status(200).json(docs)
        }) 
    })
    
// get item of equipe

    app.get('/equipes/:id', async (req,res) => {
          const id = parseInt(req.params.id)
          try {
              const docs = await db.collection('equipes').find({id}).toArray()
              res.status(200).json(docs)
          } catch (err) {
              console.log(err)
              throw err
          }
        })
        
// add new item to equipe

     app.post('/equipes', async (req,res) => {
              try {
                  const equipeData = req.body
                  const equipe = await db.collection('equipes').insertOne(equipeData)
                  res.status(200).json(equipe)
              } catch (err) {
                  console.log(err)
                  throw err
              }
            })
    
// update item to equipe          
    app.put('/equipes/:id', async (req,res) => {
                  try {
                      const id = parseInt(req.params.id)
                      const replacementEquipe = req.body
                      const equipe = await db.collection('equipes').replaceOne({id},replacementEquipe)
                      res.status(200).json(equipe)
                  } catch (err) {
                      console.log(err)
                      throw err
                  }
                })
    
// delete item from equipe
    app.delete('/equipes/:id', async (req,res) => {
                      try {
                          const id = parseInt(req.params.id)
                          const equipe = await db.collection('equipes').deleteOne({id})
                          res.status(200).json(equipe)
                      } catch (err) {
                          console.log(err)
                          throw err
                      } 
                    })
                    