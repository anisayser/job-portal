const Service = require('../services/manager.service');

module.exports.managerJobs = async (req, res) => {
    try {

        // console.log(req.user.id);
        const jobs = await Service.managerJobsServices(req.user.id);

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to get the jobs.",
            error: error.message
        })
    }
}


module.exports.getManagerJobById = async (req, res) => {
    try {

        const job = await Service.getManagerJobByIdService(req.user.id, req.params.id);

        // console.log(typeof job);
        if (Object.keys(job).length === 0) {
            return res.status(403).json({
                status: "failed",
                message: "You didn't post this job. No job found."
            })
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to get the job.",
            error: error.message
        })
    }
}
