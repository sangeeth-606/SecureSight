import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import incidentRoutes from './routes/incidents';

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://secure-sight-seven.vercel.app',
      'https://securesight-axks.onrender.com',
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan('dev'));

app.use('/api', incidentRoutes);
app.get('/health', (req, res) => {
  res.send('hello');
});

app.listen(3002, () => {
  console.log('Server running at http://localhost:3002');
});