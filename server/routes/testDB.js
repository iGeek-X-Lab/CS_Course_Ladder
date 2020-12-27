const express = require("express");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://iGeek:iGeekCSCL2020@igeekmongodb.yefsu.mongodb.net/iGeek?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

// Variable to be sent to Frontend with Database status
let databaseConnection = "Waiting for Database response...";

router.get("/", function(req, res, next) {
    res.send(databaseConnection);
});

client.connect(async function(err) {
    const collection = client.db('igeek').collection("DemoData");
    var message = await collection.find().toArray();
    databaseConnection = message[0]["message"];
    client.close();
});

module.exports = router;
