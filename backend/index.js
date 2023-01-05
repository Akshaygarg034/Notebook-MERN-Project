const express = require('express');
var cors = require('cors');
const connectToMongo = require('./db');

connectToMongo();
const app = express()
const port = 5000
app.use(cors());
app.use(express.json());

app.use('/api/noteauth', require('./routes/noteauth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`NoteApp Backend listening on port http://localhost:${port}`)
})