import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { setupDatabase } from './dbConfig';

dotenv.config();

const app = express();
const port = 3000;

setupDatabase();

app.use(cors());
app.use(express.json());

import assetsRoutes from './src/routes/assets';
import cryptoRoutes from './src/routes/crypto';
import expensesRoutes from './src/routes/expenses';
import expensesCategoriesRoutes from './src/routes/expensesCategories';
import usersRoutes from './src/routes/users';

app.use('/users', usersRoutes);
app.use('/expensesCategories', expensesCategoriesRoutes);
app.use('/expenses', expensesRoutes);
app.use('/cryptocurrency', cryptoRoutes);
app.use('/assets', assetsRoutes);

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = { app, server };