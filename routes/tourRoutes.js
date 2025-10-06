import express from 'express';
import { tourControllers } from '../controllers/tourController.js';
import { authControllers } from '../controllers/authController.js';
const router = express.Router();

// router.param('id', tourControllers.checkId);

router
  .route('/top-5-cheap')
  .get(tourControllers.aliasTopTours, tourControllers.getTours);

router.route('/tour-stats').get(tourControllers.getTourStats);
router.route('/monthly-plan/:year').get(tourControllers.getMonthlyPlan);

router
  .route('/')
  .get(authControllers.protect, tourControllers.getTours)
  .post(tourControllers.createTour);

router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(authControllers.protect, authControllers.restrictTo('admin', 'lead-guide'), tourControllers.deleteTour);

export default router;
