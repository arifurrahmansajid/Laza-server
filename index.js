const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: [ "http://localhost:5173",], 
    credentials: true,
  })
);
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nnpqtvd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
