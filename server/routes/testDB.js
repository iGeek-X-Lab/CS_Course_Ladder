const express = require("express");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://iGeek:iGeekCSCL2020@igeekmongodb.yefsu.mongodb.net/iGeek?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

router.get("/", async (req, res, next) => {
    var query = req.query;
    var result;
    switch (query.functionName) {
        case "getCoursesInRange":
            result = await getCoursesInRange(query.lowerBound, query.upperBound);
            break;
        case "getCoursesSplitByLevel":
            result = await getCoursesSplitByLevel();
            break;
    }
    res.send(result);
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
            $lt: parseInt(upperBound)
        }
    }

    const collection = client.db('igeek').collection("courses");
    var courses = await collection.find(findQuery).toArray();
    return courses;
}

async function getCoursesSplitByLevel() {
    var courseList = [];
    // TODO: remove hardcoding
    for (let i = 100; i < 500; i += 100) {
        courseList.push(await getCoursesInRange(i, i + 100));
    }
    return courseList;
}

module.exports = router;
