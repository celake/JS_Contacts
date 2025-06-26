const express = require('express');
const router = express.Router();
const contacts = require('../controllers/contacts')
const Contact = require('../models/contacts');
const Group = require('../models/groups');


router.get('/', contacts.index)
router.get('/new', contacts.renderCreateNew)
router.post('/', contacts.submitCreateNew)
router.get('/:id/edit', contacts.renderEdit)
router.put('/:id', contacts.submitEdit)
router.get('/:id', contacts.renderDetails)
router.delete('/:id', contacts.submitDelete)

module.exports = router;