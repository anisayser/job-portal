const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;



const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job title is required."],
        trim: true,
        minLength: [10, "Title can't be less then 10 charecters."],
        maxLength: [150, "Title can't be greter then 150 charecters."],
    },
    description: {
        type: String,
        required: [true, "Job description is required."],
    },
    vacancy: {
        type: Number,
        required: [true, "Job vacancy is required."]
    },
    deadLine: {
        type: Date,
        default: new Date().setDate(new Date().getDate() + 10)
    },
    applicants: [{
        _id: false,
        id: {
            type: String,
            ref: "User",
            required: true
        }
    }],
    manager: {
        name: {
            type: String,
            trim: true,
        },
        id: {
            type: ObjectId,
            ref: "User",
        }
    }
}, { timestamps: true });


const Job = mongoose.model("Job", jobSchema);

module.exports = Job;