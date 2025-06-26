const Group = require('../models/groups');

module.exports.index = async (req, res, next) => {
    console.log('group route found')
    const returnTo = req.query.returnTo;
    console.log(returnTo);  // this returns the correct url
    const groups =  await Group.find({});
    res.render('groups/index', {groups, returnTo});
}

module.exports.submitUpdates = async (req, res,  next) => {
    const { returnTo, group } = req.body;
    console.log(returnTo, group);
    const newGroup = new Group({name: group});
    await newGroup.save();
    if (returnTo) {
        res.redirect(returnTo);
    } else {
        res.redirect('contacts')
    }
}