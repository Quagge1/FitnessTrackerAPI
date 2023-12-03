//main driver class for the application
import express from 'express';
import router from './routes/workoutRoutes';
import logger from '../middleware/middleware';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use(logger);

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


