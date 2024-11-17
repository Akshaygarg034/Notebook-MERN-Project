const express = require('express');
var cors = require('cors');
const connectToMongo = require('./db');
const dotenv = require('dotenv');
dotenv.config();
connectToMongo();
const app = express()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
  res.status(300).send("Akshay's Main Backend is running properly");
});

// Notes website
app.use('/api/noteauth', require('./routes/noteauth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Main Backend listening on port ${port}`)
})     