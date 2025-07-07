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

module.exports.submitCreateNew = async (req, res, next) => {
    const contact = new Contact(req.body);
    let { groups } = req.body;
    if (!groups) { groups = [] }
    if (!Array.isArray(groups)) { groups = [groups]}
    contact.groups = groups;
    await contact.save();
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
    let  {groups} = req.body;
    console.log("Groups in body before: ",  req.body.groups)
    if (!groups) { groups = [] }
    if (!Array.isArray(groups)) { req.body.groups = [groups]}
    console.log("Groups in body after: ",  groups)
    const contact = await Contact.findByIdAndUpdate(id, {...req.body, groups});  
    console.log(contact);
    res.redirect(`/contacts/${id}`);
}

module.exports.renderDetails = async(req, res, next) => {
    const { id } = req.params;
    const contact = await Contact.findById(id).populate('groups');
    res.render('contacts/show', {contact});
}

module.exports.submitDelete = (req, res) => {
    res.send("Delete Contact!");
}