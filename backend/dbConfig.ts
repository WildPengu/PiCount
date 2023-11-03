import mongoose, { ConnectOptions } from 'mongoose';

export function setupDatabase() {
  const databaseURL = process.env.DATABASE_URL || '';

  mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  const db = mongoose.connection;

  db.on('error', (error) => console.error('Error: ', error));
  db.once('open', () => console.log('Connected to database'));
}
