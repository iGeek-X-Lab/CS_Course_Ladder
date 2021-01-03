const express = require("express");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://iGeek:iGeekCSCL2020@igeekmongodb.yefsu.mongodb.net/iGeek?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

router.get("/", async (req, res, next) => {
    var query = req.query;
    var courses = await getCoursesInRange(query.lowerBound, query.upperBound);
    res.send(courses);
});

client.connect(async(err) => {
    if (err) {
        console.log(err);
    }
});

async function getCoursesInRange(lowerBound, upperBound) {
    var findQuery = {
        "Number": {
            $gte: parseInt(lowerBound),
            $lte: parseInt(upperBound)
        }
    }

    const collection = client.db('igeek').collection("courses");
    var courses = await collection.find(findQuery).toArray();
    return courses;
}

module.exports = router;
