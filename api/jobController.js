const Job = require('./jobModel');
exports.createJob = async (req, res) => {
    try {
        const { companyName, jobTitle, description, salary } = req.body;
        if (!companyName || !jobTitle || !description || !salary) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const job = new Job({ companyName, jobTitle, description, salary });
        await job.save();
        res.status(201).json({ message: 'Job created successfully', job });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json({ message: 'Jobs retrieved successfully', jobs });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
