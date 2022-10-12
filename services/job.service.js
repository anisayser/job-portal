const Apply = require("../models/application.model");
const Job = require("../models/job.model")



module.exports.getJobs = async () => {
    const jobs = await Job.find({});
    return jobs;
}

module.exports.addJobsService = async (data) => {
    const result = await Job.create(data);
    return result;
}

module.exports.getJobByIdService = async (id) => {
    const job = await Job.findOne({ _id: id }).populate('manager.id');
    return job;
}

module.exports.updateJobByIdService = async (id, data) => {
    const result = await Job.updateOne({ _id: id }, { $set: data });
    return result;
}

module.exports.applyForJobService = async (data) => {
    const result = await Apply.create(data);
    return result;
}