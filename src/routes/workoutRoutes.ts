import express from 'express';
import { createWorkout, deleteWorkout, getWorkout, readWorkout, updateWorkout } from '../controllers/workoutController';

const router = express.Router();
//Route to check route path is good
router.get('/', (req, res) => {
  res.send('Hello, this is the root path!');
});
//Routes for functions
router.post('/workout', createWorkout);
router.get('/workout', getWorkout);
router.get('/workout/:id', readWorkout);
router.delete('/workout/:id', deleteWorkout);
router.put('/workout/:id', updateWorkout);

export default router;

