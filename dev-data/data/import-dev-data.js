const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

// console.log(process.env);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('database has been connected successfully');
  });
console.log(process.argv);
//CREATE NEW TOUR
const createTour = async () => {
  try {
    const tours = JSON.parse(
      fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
    );
    await Tour.create(tours);
    console.log('database collections has been created successfully!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE ALL TOUR
const deleteTour = async () => {
  try {
    await Tour.deleteMany();
    console.log('Tours has been deleted successfully!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

process.argv.forEach((e) => {
  if (e === '--import') createTour();
  else if (e === '--delete') deleteTour();
});
