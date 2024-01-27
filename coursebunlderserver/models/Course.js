import mongoose from "mongoose"

const schema = new mongoose.Schema({});

export const Course= mongoose.model("Course",schema);