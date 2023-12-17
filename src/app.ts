// main driver class for the application
import express from 'express';
import router from './routes/workoutRoutes';
import logger from '../middleware/middleware';
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:4200', 
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use(router);


app.options('/workout', cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

