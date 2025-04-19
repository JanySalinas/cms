const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get all activities');
});

router.get('/:id', (req, res) => {
    const activityId = req.params.id;
    if (!activityId) {
        return res.status(400).send('Activity ID is required');
    }
    res.send(`Get activity with ID: ${activityId}`);
});

router.post('/', (req, res) => {
    const newActivity = req.body;
    if (!newActivity || !newActivity.name) {
        return res.status(400).send('Activity name is required');
    }
    res.send(`Create a new activity: ${JSON.stringify(newActivity)}`);
});

router.put('/:id', (req, res) => {
    const activityId = req.params.id;
    const updatedActivity = req.body;
    if (!activityId) {
        return res.status(400).send('Activity ID is required');
    }
    res.send(`Update activity with ID: ${activityId} to ${JSON.stringify(updatedActivity)}`);
});

router.delete('/:id', (req, res) => {
    const activityId = req.params.id;
    res.send(`Delete activity with ID: ${activityId}`);
});

module.exports = router;