const Job = require('../models/job.model');
const Service = require('../services/job.service');

module.exports.getJobs = async (req, res) => {
    try {

        const jobs = await Service.getJobs();

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to get the jobs.",
            error: error.message
        })
    }
}

module.exports.addJobs = async (req, res) => {
    try {
        const result = await Service.addJobsService(req.body);

        res.status(200).json({
            status: "Success",
            message: "Job posted successfully.",
            result: result
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to post the job.",
            error: error.message
        })
    }
}


module.exports.getJobById = async (req, res) => {
    try {

        const job = await Service.getJobByIdService(req.params.id);

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to get the Job.",
            error: error.message
        })

    }
}

module.exports.updateJobById = async (req, res) => {
    try {
        const result = await Service.updateJobByIdService(req.params.id, req.body);

        res.status(200).json({
            status: "Success",
            message: "Job updated successfully.",
            result: result
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to update the Job.",
            error: error.message
        })
    }
}


module.exports.applyForJob = async (req, res) => {
    try {


        const theJob = await Job.findOne({ _id: req.params.id });
        console.log("the job", theJob.applicants);
        console.log(req.user.customId);
        if (theJob.deadLine < new Date()) {
            return res.status(500).json({
                status: "Failed",
                message: "Application time is over."
            })
        }
        const dupApply = theJob.applicants.find(applicant => applicant.id === req.user.customId);
        console.log("the duply", dupApply);
        if (dupApply) {
            return res.status(500).json({
                status: "Failed",
                message: "You've already applied for this job."
            })
        }


        const result = await Service.applyForJobService(req.body);

        const newApplicantsForThisJob = [...theJob.applicants, { id: req.user.customId }]
        console.log("new", newApplicantsForThisJob);

        if (result) {
            await Job.updateOne({ _id: req.params.id }, { $set: { applicants: newApplicantsForThisJob } });
        }

        res.status(200).json({
            status: "Success",
            message: "Applied to the job successfully.",
            result: result
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to apply the Job.",
            error: error.message
        })
    }
}