const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users');
const products = require('./data/products.js');
const User = require('./modals/userModal.js');
const Product = require('./modals/productModal.js');
const connectDB = require('./config/db.js');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const dummyUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => ({
      ...product,
      user: dummyUser,
    }));

    await Product.insertMany(sampleProducts);
    console.log('Data imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error.message}`.green.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Data destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.green.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
