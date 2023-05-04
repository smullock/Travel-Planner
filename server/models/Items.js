const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const itemSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  hotel: {
    type: String,
    required: true,
  },
  flights: {
    type: Number,
    required: true,
  },
  food: {
    type: Number,
    required: true,
  },
  activities: {
    type: Number,
    required: true,
  },
  transport: {
    type: Number,
    required: true,
  },

});



const Item = model('Items', itemSchema);

module.exports = Items;