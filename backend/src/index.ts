import { Request, Response, NextFunction } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes';

dotenv.config();

export const app = express();

const port = 3010;

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.get('/', (req, res) => {
  res.send('Hola LTI!');
});

// API routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
