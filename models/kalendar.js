const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  data: {
    days: [],
    months: [],
  },
});

module.exports = mongoose.model('Calendar', calendarSchema);
