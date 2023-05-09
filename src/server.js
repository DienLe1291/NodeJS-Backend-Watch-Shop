import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB';
import initRoutes from './routes';

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDB();
initRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})