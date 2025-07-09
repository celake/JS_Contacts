const express = require('express');
const router = express.Router();
const contacts = require('../controllers/contacts')
const Contact = require('../models/contacts');
const Group = require('../models/groups');
const { validateContact } =  require('../middleware');
const { body, validationResult } = require('express-validator');


router.get('/', contacts.index)
router.get('/new', contacts.renderCreateNew)
router.post('/', validateContact, contacts.submitCreateNew)
router.get('/:id/edit', contacts.renderEdit)
router.put('/:id', validateContact, contacts.submitEdit)
router.get('/:id', contacts.renderDetails)
router.delete('/:id', contacts.submitDelete)

module.exports = router;