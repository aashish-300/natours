const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./models/tourModel');

dotenv.config({ path: './config.env' });
const app = require('./app');

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

// const tourSchema = new mongoose.Schema({
//   name: {
//     required: [true, 'name filled is required'],
//     unique: true,
//     type: String,
//   },
//   price: {
//     required: [true, 'price filled is required'],
//     type: Number,
//   },
//   rating: {
//     default: 4.6,
//     type: Number,
//   },
// });

// const Tour = mongoose.model('Tour', tourSchema);

// const testTour = new Tour({
//   name: 'The Snow Adventure',
//   price: 300,
//   // rating: 4.9,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR 🔥 ', err);
//   });

app.listen(process.env.PORT, () => {
  console.log('server has started to listen');
});
