const express = require('express');
const axios = require('axios');
const router = express.Router();
const Job = require('../models/Job');

router.get('/', async (req, res) => {
  try {
    // Fetch data from the external API (JSON format)
    const { data } = await axios.get('https://jobicy.com/api/v2/remote-jobs');

    // Loop through job items in the JSON data
    const jobItems = data.jobs; // Assuming the jobs are under a 'jobs' key
    for (let item of jobItems) {
      const jobData = {
        title: item.jobTitle,
        company: item.companyName || 'Unknown',
        location: item.jobGeo || 'Remote',
        description: item.jobDescription || 'No description provided',
        applyUrl: item.url,
        datePosted: new Date(item.pubDate),
      };

      // Check if the job already exists
      const existingJob = await Job.findOne({
        title: jobData.title,
        company: jobData.company,
      });
      if (!existingJob) {
        // If the job doesn't exist, save it
        const job = new Job(jobData);
        await job.save();
      }
    }

    // Retrieve all jobs and send to the frontend
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching or saving job data:', error);
    res.status(500).send('Error fetching or saving job data');
  }
});

module.exports = router;
