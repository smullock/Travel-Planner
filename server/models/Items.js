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
  details: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  budgetTotal: {
    type: Number,
    required: false,
  },

  expenseTotal: {
    type: Number,
    required: false,
  },
  

});



const Item = model('Items', itemSchema);

module.exports = Item;