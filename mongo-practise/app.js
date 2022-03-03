const MongoClient = require("mongodb").MongoClient
const assert = require("assert");
const { constants } = require("buffer");

const url = "mongodb://localhost:27017"
const dbName = "fruitsDB"
const client = new MongoClient(url);

client.connect(function (err) {
    assert.equal(null,err)
    console.log("connected successfully to server")
    const db = client.db(dbName)

    findDocuments(db, function () {
        client.close()
      })
    
  })

  const insertDocuments =function(db, callback){
      const collection = db.collection("fruits")
      collection.insertMany(
          [
              {
                  name:"apple",
                  Score:8,
                  review:"great Fruit"
              },
              {
                name:"Orange",
                  Score:6,
                  review:"sour Fruit"
              },
              { name:"Banana",
              Score:9,
              review:"greatest Fruit"

              }
          ],
          function (err, result) {
              assert.equal(err, null)
             
             
              console.log("Inserted 3 documents into the collection")
              callback(result)
            }
       )
  }

  const findDocuments = function (db, callback) {
      const collection =db.collection("fruits")
      collection.find({}).toArray(function (err, fruits) {
          assert.equal(err,null)
          console.log("FOUND THE FOLLOWING RECORDS")
          console.log(fruits)
          callback(fruits)
        })
    }