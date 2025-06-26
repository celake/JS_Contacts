const express = require('express');
const router = express.Router();
const groups = require('../controllers/groups')

const Contact = require('../models/contacts');
const Group = require('../models/groups');

router.get('/', groups.index)
router.post('/', groups.submitUpdates)

module.exports = router;