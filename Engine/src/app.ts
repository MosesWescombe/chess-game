import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
