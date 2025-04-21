const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/activity.controller');

router.get('/',    ctrl.getAllActivities);
router.get('/:id', ctrl.getActivityById);
router.post('/',   ctrl.createActivity);
router.put('/:id', ctrl.updateActivity);
router.delete('/:id', ctrl.deleteActivity);

module.exports = router;