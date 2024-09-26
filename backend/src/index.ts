import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import cors from 'cors'; // Import the cors package

const app = express();
const port = 8080;

// Enable CORS for all routes
app.use(cors());

// Function to get data from a specific table in the database
const getDataFromDatabase = async (dbPath: string, tableName: string): Promise<any[]> => {
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    // Query the correct table for questions data
    const query = `SELECT * FROM ${tableName}`;
    const data = await db.all(query);
    await db.close();
    return data;
};

// Endpoint to get questions from the first database
app.get('/questions/db1', async (req: Request, res: Response) => {
    try {
        const dbPath = path.resolve(__dirname, 'db/question_app_1.db');
        const questions = await getDataFromDatabase(dbPath, 'questions_ods'); // Use the correct table name
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
});

// Endpoint to get questions from the second database
app.get('/questions/db2', async (req: Request, res: Response) => {
    try {
        const dbPath = path.resolve(__dirname, 'db/question_app_2.db');
        const questions = await getDataFromDatabase(dbPath, 'questions_ods_clean'); // Use the correct table name
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});