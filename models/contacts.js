const mongoose = require('mongoose');
const Group = require('./groups');
const Schema = mongoose.Schema;

const ContactSchema = new Schema( {
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    groups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        }
    ]
})


module.exports = mongoose.model('Contact', ContactSchema)