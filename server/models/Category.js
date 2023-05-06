const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const categorySchema = new Schema({
 
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



const Category = model('Category', categorySchema);

module.exports = Category;