const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    follower: {type: Schema.ObjectId, required: true, ref: 'user'},
    following: {type: Schema.ObjectId, required: true, ref: 'user'}
})

module.exports = mongoose.model('Follow', FollowSchema);