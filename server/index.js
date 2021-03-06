import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import postRoutes from './routes/posts.js';

const app = express();
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

app.use(cors());

const parserOptions = { extended: true, limit: '50mb' };
app.use(bodyParser.urlencoded(parserOptions));
app.use(bodyParser.json(parserOptions));
app.use('/posts', postRoutes);
app.get('/', (_, res) => {
  res.send('Welcome to starlights API');
})

const CONNECTION_URL = 'mongodb+srv://' + process.env.DB_USER + ':'  + process.env.DB_PASS +
  '@cluster0.hozzn.mongodb.net/starlights-app?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}.`)))
  .catch(() => (error) => console.log(error));
