const { Schema, model } = require('mongoose');


const itemSchema = new Schema({
  date: {
    type: String,
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
  budget: {
    type: Schema.Types.ObjectId,
    ref: 'Budget',
  },

  // budgetTotal: {
  //   type: Number,
  //   required: false,
  // },

  

});



const Item = model('Item', itemSchema);

module.exports = Item;