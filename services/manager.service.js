const Job = require("../models/job.model");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports.managerJobsServices = async (id) => {
    // const jobs = await Job.find({  });

    const jobs = await Job.aggregate([
        { $match: { "manager.id": id } }
    ])

    return jobs;
}

module.exports.getManagerJobByIdService = async (managerId, jobId) => {
    const jobsOfManager = await Job.aggregate([
        { $match: { "manager.id": managerId, _id: ObjectId(jobId) } },
        {
            $lookup: {
                from: "users",
                foreignField: "id",
                localField: "applicants.id",
                as: "applicantDetails"
            }
        }
    ]);

    // const job = jobsOfManager.filter(job => job._id == jobId);


    return jobsOfManager;
}