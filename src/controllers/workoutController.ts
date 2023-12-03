import { Request, Response } from 'express';
import dataBase from '../models/database';
import { Workouts } from '../models/workouts';
import { OkPacket, RowDataPacket} from 'mysql2'

//Since this is a simple and straight forward application the CRUD operations are being handled by the controller
export const createWorkout = async (req: Request, res: Response): Promise<void> => {
  const { name, duration, calories }: Workouts = req.body;
  console.log(req.body);

  try {
    const conn = await dataBase; 

    //Inserting workout into database
    const result = await conn.query('INSERT INTO workouts (name, duration, calories) VALUES (?, ?, ?)', [
      name,
      duration,
      calories,
    ]);

    const insertId = (result[0] as any)?.insertId; 
    res.json({ id: insertId, name, duration, calories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getWorkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const conn = await dataBase; 

    //getting a workout from the database
    const result = await conn.query('SELECT * FROM workouts');
    
    if (Array.isArray(result[0])) {
      const workouts: Workouts[] = result[0] as Workouts[];
      res.json(workouts);
    } else {
      console.error('Unexpected result format:', result);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteWorkout = async (req: Request, res: Response): Promise<void> => {
  const workoutId: number = parseInt(req.params.id, 10); 

  try {
    const conn = await dataBase;

    //getting the workout from the database
    const [checkResult] = await conn.execute<RowDataPacket[]>('SELECT * FROM workouts WHERE id = ?', [workoutId]);

    if (Array.isArray(checkResult) && checkResult.length > 0) {
      
      //deleting workout from the database once it is selected
      const [deleteResult] = await conn.execute<OkPacket>('DELETE FROM workouts WHERE id = ?', [workoutId]);

      if (deleteResult.affectedRows > 0) {
        res.json({ message: 'Workout deleted successfully' });
      } else {
        res.status(404).json({ error: 'Workout not found' });
      }
    } else {
      res.status(404).json({ error: 'Workout not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateWorkout = async (req: Request, res: Response): Promise<void> => {
  const workoutId: number = parseInt(req.params.id, 10);
  const { name, duration, calories } = req.body;

  try {
    const conn = await dataBase;

    //getting workout from database
    const [checkResult] = await conn.execute<RowDataPacket[]>('SELECT * FROM workouts WHERE id = ?', [workoutId]);

    if (Array.isArray(checkResult) && checkResult.length > 0) {
      
      const [updateResult] = await conn.execute<OkPacket>(
        //updating workout once selected
        'UPDATE workouts SET name = ?, duration = ?, calories = ? WHERE id = ?',
        [name, duration, calories, workoutId]
      );

      if (updateResult.affectedRows > 0) {
        res.json({ message: 'Workout updated successfully' });
      } else {
        res.status(500).json({ error: 'Failed to update workout' });
      }
    } else {
      res.status(404).json({ error: 'Workout not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//to find a specific workout
export const readWorkout = async (req: Request, res: Response): Promise<void> => {
  const workoutId: number = parseInt(req.params.id, 10);

  try {
    const conn = await dataBase;

    //select specific workout from data bases based on id
    const [result] = await conn.execute<RowDataPacket[]>('SELECT * FROM workouts WHERE id = ?', [workoutId]);

    if (Array.isArray(result) && result.length > 0) {
      const workout = result[0];
      res.json(workout);
    } else {
      res.status(404).json({ error: 'Workout not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};