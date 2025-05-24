const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [ "http://localhost:5173", ],
    credentials: true,
  })
);
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nnpqtvd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();
    const productCollection = client.db("productDB").collection("product");

    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.get('/product', async(req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/product/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await productCollection.findOne(query);
      res.send(result)
    });

    app.post('/product', async(req, res) => {
      const newProduct= req.body;
      console.log(newProduct);
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    });

    app.delete('/product/:id', async(req, res) => {
      const id = req.params.id;
      const query= {_id: new ObjectId(id)};
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

  } finally {

  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Welcome in The Equi Sports Server')
});

app.listen(port, ()=> {
  console.log(`Sports server is running on: ${port}`)
});