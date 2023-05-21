
// ---------------newcode------------
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

// mongo-start--------------
const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.v4ogoz2.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("toyDB");
    const toyland = database.collection("toyland");
    const subcetegory = database.collection("Subcetegory");
    const gelery = database.collection("gelery");

    client.connect();

    app.get('/toyland', async (req, res) => {
      const cursor = toyland.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/subcetgory', async (req, res) => {
      const cursor = subcetegory.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get('/subcetgory/:id', async (req, res) => {
      const query = { _id : new ObjectId(req.params.id) };
      const result = await subcetegory.findOne(query) || {};
   
      res.send(result);
    });

    app.get('/gelery', async (req, res) => {
      const cursor = gelery.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/toyland/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await toyland.findOne(query);
      res.send(result);
    });

    app.get('/user', async (req, res) => {
      let query = {};
      if (req.query.sub_category) {
        query = { sub_category: req.query.sub_category };
      }
      const result = await toyland.find(query).toArray();
      res.send(result);
    });

    app.get('/singleEmail', async (req, res) => {
      const query = { sellerEmail: req.query.sellerEmail };
      const result = await toyland.find(query).toArray() || {};
      res.send(result);
    });

    app.post('/toyland', async (req, res) => {
      const newToy = req.body;
      const result = await toyland.insertOne(newToy);
      res.send(result);
    });

    app.delete('/delete/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await toyland.deleteOne(query);
      res.send(result);
    });

    app.patch('/update/:id', async (req, res) => {
      const id = req.params.id;
      const updated = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          price: updated.price,
          available_quantity: updated.quantity,
          description: updated.description,
        },
      };
      const result = await toyland.updateOne(filter, updateDoc);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);
// mongo-end------------

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});






