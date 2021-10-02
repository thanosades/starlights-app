/* eslint-disable no-console */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const parserOptions = { limit: "30mb", extended: true };
app.use(express.json(parserOptions));
app.use(express.urlencoded(parserOptions));
app.use(cors());

const CONNECTION_URL = "mongodb+srv://" + process.env.DB_USER + ":"  + process.env.DB_PASS +
  "@cluster0.hozzn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}.`)))
  .catch(() => (error) => console.error(error.message));
