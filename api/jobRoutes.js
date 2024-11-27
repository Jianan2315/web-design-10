const express = require('express');
const router = express.Router();
const jobController = require('./jobController');

// Route to create a job
router.post('/create/job', jobController.createJob);

// Route to get all jobs
router.get('/get/jobs', jobController.getJobs);

module.exports = router;
