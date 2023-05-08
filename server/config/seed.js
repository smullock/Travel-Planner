const db = require('./connection');
const { User, Item, Category,Budget } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const category = await Category.insertMany([
    { name: 'Food' },
    { name: 'Flights' },
    { name: 'Transport' },
    { name: 'Activities' },
    { name: 'Misc' }
  ]);

  console.log('categories seeded');

  await Item.deleteMany();

  const items = await Item.insertMany([
    {
      date: '2022-06-01',
      city: 'Sydney',
      hotel: 'Sofitl Darling Harbour',
      details: 'Staying overnight before flight',
     
    },

  
  ]);

  console.log('item seeded');

  const budget = await Budget.insertMany([

    {
      amount: '100.00',
      category: 'Flights',
    },

    {
      amount: '1000.00',
      category: 'Food',
    },

  ]);

  
  await User.create({
    username: 'Sarah',
    email: 'sarah@testmail.com',
    password: 'password12345',

  });

  console.log('users seeded');

  process.exit();
});
