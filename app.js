/* eslint-enable prettier/prettier */
const express = require('express');
const morgan = require('morgan');
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );

// const getAllTours = (req, res) => {
//   res.status(200).json({
//     requested: req.requestTime,
//     message: 'success',
//     result: tours.length,
//     data: {
//       tours: tours,
//     },
//   });
// };

// const getTour = (req, res) => {
//   const id = req.params.id;
//   const tour = tours.find((e) => e.id === parseInt(id));
//   console.log(tour);

//   if (!tour) {
//     return res.status(404).json({ status: 'fail', message: 'INVALID ID' });
//   }

//   res.status(200).json({
//     message: 'success',
//     tour,
//   });
// };

// const createNewTour = (req, res) => {
//   const ID = tours[tours.length - 1].id + 1;
//   console.log(ID);
//   const data = {
//     id: ID,
//     message: 'success',
//     data: req.body,
//   };
//   tours.push(data);

//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => console.log(err)
//   );
//   res.send('DONE!');
// };

// const updateTour = (req, res) => {
//   console.log('tour has been updated!');
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({ status: 'fail', message: 'INVALID ID' });
//   }

//   res.status(200).json({
//     message: 'success',
//     data: '<UPDATED TOUR> ...',
//   });
// };

// const deleteTour = (req, res) => {
//   console.log('tour has been updated!');
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({ status: 'fail', message: 'INVALID ID' });
//   }

//   res.status(204).json({
//     message: 'success',
//     data: null,
//   });
// };

// const getAllUsers = (req, res) => {
//     res.status(500).json({ status: 'fail', message: 'URL is still not defined!'});
// }

// const createUser = (req, res) => {
//     res.status(500).json({ status: 'fail', message: 'URL is still not defined!'});
// }

// const getUser = (req, res) => {
//     res.status(500).json({ status: 'fail', message: 'URL is still not defined!'});
// }

// const updateUser = (req, res) => {
//     res.status(500).json({ status: 'fail', message: 'URL is still not defined!'});
// }

// const deleteUser = (req, res) => {
//     res.status(500).json({ status: 'fail', message: 'URL is still not defined!'});
// }

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createNewTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// const tourRoute = express.Router();
// const userRoute = express.Router();

// tourRoute
//     .route('/')
//     .get(getAllTours)
//     .post(createNewTour);

// tourRoute
//   .route('/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(deleteTour);

// userRoute
//     .route('/')
//     .get(getAllUsers)
//     .post(createUser)

// userRoute
//     .route('/:id')
//     .get(getUser)
//     .patch(updateUser)
//     .delete(deleteUser)

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

//STARTING THE SERVER
// app.listen(3000, () => {
//   console.log('server has started to listen');
// });

module.exports = app;
