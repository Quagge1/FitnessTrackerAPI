import { createConnection, Connection } from 'mysql2/promise';

//database connection class
const connection: Promise<Connection> = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'workouts',
  port: 3306
});

export default connection;
