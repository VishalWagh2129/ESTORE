import express from 'express';
import dotenv from 'dotenv';
import './config/dbConfig'; // Import the DB configuration
import userRoutes from './routes/routes';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
