const express = require('express');
const {
  getAllTours,
  getTour,
  createNewTour,
  updateTour,
  deleteTour,
  checkbody,
  alias,
  getTourStat,
  getMonthlyPlan
} = require('../controllers/tourController');

const router = express.Router();

// router.param('id', checkId);

router.route('/top-5-tours').get(alias, getAllTours);

router.route('/tour-stat').get(getTourStat);

router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(getAllTours).post(checkbody, createNewTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
