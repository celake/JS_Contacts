const Contact = require('../models/contacts');
const Group = require('../models/groups');
const { extractGroupNames, normalizeGroups } = require('../utils/formHelpers');
const { body, validationResult } = require('express-validator');

module.exports.index = async (req, res, next) => {
    const contacts =  await Contact.find({});
    const groups =  await Group.find({});
    const messages = req.flash()
    res.render('index', { contacts, groups });
}

module.exports.renderCreateNew = async(req, res, ) => {
    const currentUrl = req.url;
    const returnTo = `contacts/new`
    const groups =  await Group.find({});
    const contact = {};
    res.render('contacts/new', { groups, currentUrl, returnTo, contact, names: []});
}

module.exports.submitCreateNew = async (req, res, next) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    const firstError = errors.length > 0 ? errors[0] : null;
    const returnTo = `contacts/new`
    
    if (firstError) {
        const flashMsg = firstError.msg;
        const flashClass = 'error';
        const contact = req.body;
        const groups =  await Group.find({});
        const names = extractGroupNames(contact.groups, groups);

        return res.render('contacts/new', { 
            contact, 
            groups, 
            returnTo, 
            flashMsg,
            flashClass, 
            names 
        });
    }

    const contact = new Contact(req.body);

    // make certain that groups is always an array
    let { groups } = req.body;
    contact.groups = normalizeGroups(groups);

    await contact.save();
    req.flash('success', "New contact created.");
    res.redirect('/contacts');
}

module.exports.renderEdit = async (req, res, next) => {
    const { id } = req.params;
    const returnTo = `contacts/${id}/edit`
    const groups =  await Group.find({});
    const contact = await Contact.findById(id).populate('groups');
    const names = contact.groups.map(group => group.name);
    res.render('contacts/edit', { contact, groups, returnTo, names});
}

module.exports.submitEdit = async (req, res, next) => {
    const {id} = req.params;
    const errors = validationResult(req).array({ onlyFirstError: true });
    const firstError = errors.length > 0 ? errors[0] : null;

    if (firstError) {
        const flashMsg = firstError.msg;
        const flashClass = 'error'
 
        const contact = { ...req.body, _id: id };
        const groups =  await Group.find({});
        const names = extractGroupNames(contact, groups);

        return res.render(`contacts/edit`, { 
            contact, 
            groups, 
            returnTo: `/contacts/${id}`, 
            flashMsg,
            flashClass, 
            names 
        });
    }

    let  {groups} = req.body;
    req.body.groups = normalizeGroups(groups)

    const contact = await Contact.findByIdAndUpdate(id, {...req.body, groups});  
    req.flash('success', "Contact Updated.");
    res.redirect(`/contacts/${id}`);
}

module.exports.renderDetails = async(req, res, next) => {
    const { id } = req.params;
    const contact = await Contact.findById(id).populate('groups');
    if (!contact) {
        req.flash('error', 'Cannot find that contact');
        return res.redirect('/contacts');
    }
    res.render('contacts/show', {contact, messages: req.flash('success')});
}

module.exports.submitDelete = async (req, res) => {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.redirect('/contacts');
}