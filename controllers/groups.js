const Group = require('../models/groups');
const Contact = require('../models/contacts');
const { normalizeGroups } = require('../utils/formHelpers');

module.exports.index = async (req, res, next) => {
    const returnTo = req.query.returnTo;
    const groups =  await Group.find({});
    res.render('groups/index', {groups, returnTo});
}

module.exports.submitUpdates = async (req, res,  next) => {
    const { returnTo, group, groupName } = req.body;

    // add new group if field was filled in. 
    if (group) {
        const newGroup = new Group({name: group});
        await newGroup.save();  
    }
    const groupIds = normalizeGroups(groupName);
    // remove deleted groups from each contact
    if (groupIds) {
        await Contact.updateMany(
            { groups: groupIds },
            { $pull: { groups: groupIds } }
        );
    }

    // delete each group in groups table
    for (id of groupIds) {
        await Group.deleteOne({_id: id})
    }
    
    if (returnTo) {
        res.redirect(returnTo);
    } else {
        res.redirect('contacts')
    }
}