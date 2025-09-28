import express from 'express';
import { userControllers } from '../controllers/userController.js';
import authControllers from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);

router
  .route('/')
  .get(userControllers.getAllUser)
  .post(userControllers.createUser);

router
  .route('/:id')
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

export default router;
