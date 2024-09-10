const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/jobs', async (req, res) => {
  try {
    const { data } = await axios.get('https://jobicy.com/jobs-rss-feed');
    // Parse and send the relevant job data (use an XML parser if needed)
    res.json(data); // Placeholder response
  } catch (error) {
    res.status(500).send('Error fetching job data');
  }
});

module.exports = router;
