const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/fruitsDB")

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    },
    rating: {
        type: Number,
        min:1,
        max:10
    },
    review: String
})

const Fruit = mongoose.model("Fruit", fruitSchema)

const fruit = new Fruit({
    name: "Apple",
    rating: 5,
    review: "Solid fruit out there"
})

//fruit.save()
const fruit2 = new Fruit({
    name: "Peaches",
    rating: 9,
    review: "Peaches are good"
})
//fruit2.save()
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit : fruitSchema
})

const Person = mongoose.model("Person",personSchema)


// const person = new Person({
//     name: "John",
//     age: 37
// })
// const pineApple = new Fruit({
//     name: "Pineapple",
//     rating: 8,
//     review:"good fruit"
// })
//pineApple.save()
const guava = new Fruit({
    name: "guava",
    rating: 7,
    review:"good fruit"
})
guava.save()

// const newPerson = new Person({
//     name: "Amy",
//     age: 37,
//     favouriteFruit: pineApple
// })
//newPerson.save()

//person.save()

// const peach = new Fruit({
//     name: "Peach",
//     rating: 10,
//     review: "best fruit ever"
// })
// const banana = new Fruit({
//     name: "banana",
//     rating: 8,
//     review: "multi purpose"
// })

// const orange = new Fruit({
//     name: "orange",
//     rating: 7,
//     review: "sour taste"
// })

// Fruit.insertMany([peach, banana, orange], function (err) {
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log("successfully inserted")
//     }
//   })

Fruit.find(function (err, fruits) {
    if(err){
        console.log(err)
    }
    else{
        // console.log(fruits)
        //mongoose.connection.close()
        fruits.forEach(function (fruit) {
            console.log(fruit.name)
          })
    }
  })

Person.updateOne({name:"John"}, {favouriteFruit: guava}, function (err) {
    if(err){
                  console.log(err)
              }
              else{
                  
                  console.log("updated Successfully!")
              }
  })

//   Fruit.updateOne({_id:"62222bdc1a6d4a0d5ea2263b"},{name:"Mango"}, function (err) {
//       if(err){
//           console.log(err)
//       }
//       else{
//           console.log("updated Successfully!")
//       }
//     })

// Fruit.deleteOne({review:"Mango is the best"}, function (err) { 
//     if(err){
//         console.log(err)
//     }
//     else{
//         mongoose.connection.close()
//         console.log('Successfully deleted')
//     }
//  })
//  Person.deleteMany({name:"John"}, function (err) {
//     if(err){
//                 console.log(err)
//             }
//             else{
//                 mongoose.connection.close()
//                 console.log('Successfully deleted all data')
//             }
//    })

//   const findDocuments = function (db, callback) {
//       const collection =db.collection("fruits")
//       collection.find({}).toArray(function (err, fruits) {
//           assert.equal(err,null)
//           console.log("FOUND THE FOLLOWING RECORDS")
//           console.log(fruits)
//           callback(fruits)
//         })
//     }
