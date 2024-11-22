import express from 'express';
import fetchRoute from './router.js';

// Initialize the app
const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', fetchRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
