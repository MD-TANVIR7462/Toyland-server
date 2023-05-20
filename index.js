const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT||5000

app.use(cors())
app.use(express.json())
 

// mongo-start--------------




const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.v4ogoz2.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const database = client.db("toyDB");
    const toyland = database.collection("toyland");
    const subcetegory = database.collection("Subcetegory")
    const gelery = database.collection("gelery")
  


    // Connect the client to the server	(optional starting in v4.7)
  client.connect();
    // -------------getting all data--------
    app.get('/toyland', async (req,res)=>{
      const corsor = toyland.find()
      const result = await corsor.toArray()
      res.send(result)
    })



    app.get('/subcetgory', async (req,res)=>{
      const corsor = subcetegory.find()
      const result = await corsor.toArray()
      res.send(result)
    })


    // -----------gelery section---------
    app.get('/gelery', async (req,res)=>{
      const corsor = gelery.find()
      const result = await corsor.toArray()
      res.send(result)
    })





// ---------getting a single data------
app.get('/toyland/:id', async (req,res)=>{
  const id = req.params.id
  const query = {_id : new ObjectId(id)}
  const result = await toyland.findOne(query)
  res.send(result)
})



// ---------getting sub-cetegory------
app.get('/user', async (req,res)=>{
  let query = {}
  if(req.query.sub_category){
    query={sub_category : req.query.sub_category}
  console.log('hellow')
  }
  console.log(query)
  const result = await toyland.find(query).toArray()
  res.send(result)
})

// ----getting email data-----
app.get('/singleEmail', async (req,res)=>{
  console.log(req.query.sellerEmail)
  let query = {}
  if(req.query.sellerEmail){
    query={sellerEmail : req.query.sellerEmail}
  console.log('hellow')
  }
  console.log(query)
  const result = await toyland.find(query).toArray() || {}
  res.send(result)
})

// -------------------post-mathod------------
app.post('/toyland',async (req,res)=>{
  const newToy =req.body
  const result = await toyland.insertOne(newToy);

  res.send(result)
})






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




// mongo-end------------

app.get('/',(req,res)=>{
   res.send('hellow')
})
app.listen(port)

// ToyLand
// GdvMsANvu4DK32yH