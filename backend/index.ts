import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();
const databaseURL = process.env.DATABASE_URL || '';

const app = express();
const port = 3000;
mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const db = mongoose.connection;

db.on('error', (error) => console.error('Error: ', error));
db.once('open', () => console.log('Connected to database'));

app.use(cors());
app.use(express.json());

import expensesRoutes from './src/routes/expenses';
import expensesCategoriesRoutes from './src/routes/expensesCategories';
import usersRoutes from './src/routes/users';

app.use('/users', usersRoutes);
app.use('/expensesCategories', expensesCategoriesRoutes);
app.use('/expenses', expensesRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
