var mongoose = require('mongoose');
module.exports = mongoose.model('WeeklySchedule',{
    startDate: String,
    roomid: Number,
    slots: { type : Array , "default" : [] }
});