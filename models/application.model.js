const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const applicationSchema = mongoose.Schema({
    job: {
        name: {
            type: String,
            trim: true,
            required: [true, "Job Name is required."]
        },
        id: {
            type: ObjectId,
            ref: "Job",
            required: true
        }
    },

    applicantInfo: {
        name: {
            type: String,
            trim: true,
            required: [true, "Applicant name is required."]
        },
        id: {
            type: String,
            ref: "User",
            required: true
        }
    },

    skills: {
        type: String,
        trim: true,
        required: [true, "Please provide your skills."]
    }

}, { timestamps: true });


const Apply = mongoose.model("Apply", applicationSchema);

module.exports = Apply;