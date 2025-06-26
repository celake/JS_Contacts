const Contact = require('../models/contacts');
const Group = require('../models/groups');


module.exports.index = async (req, res, next) => {
    const contacts =  await Contact.find({});
    const groups =  await Group.find({});
    res.render('index', { contacts, groups });
}

module.exports.renderCreateNew = async(req, res, ) => {
    const currentUrl = req.url;
    const returnTo = `contacts/new`
    const groups =  await Group.find({});
    res.render('contacts/new', { groups, currentUrl, returnTo});
}


module.exports.submitCreateNew = (req, res) => {
    res.send("Submity new contact form");
}

module.exports.renderEdit = async (req, res, next) => {
    const { id } = req.params;
    const returnTo = `contacts/${id}/edit`
    const groups =  await Group.find({});
    const contact = await Contact.findById(id).populate('groups');
    res.render('contacts/edit', { contact, groups, returnTo });
}

module.exports.submitEdit = (req, res) => {
    res.send("Submit edit form!");
}

module.exports.renderDetails = async(req, res, next) => {
    const { id } = req.params;
    const contact = await Contact.findById(id).populate('groups');
    res.render('contacts/show', {contact});
}

module.exports.submitDelete = (req, res) => {
    res.send("Delete Contact!");
}