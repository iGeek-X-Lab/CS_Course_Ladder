const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    subject: String,
    number: Number,
    title: String,
    description: String,
    prerequisite: [{subject: String, number: Number}]
});

const Course = mongoose.model("Course", CourseSchema);

/* 
subject: CMPUT
number: 175
title: intro to cs
description: buhla..
prerequest: [{CMPUT, 174}]
*/


