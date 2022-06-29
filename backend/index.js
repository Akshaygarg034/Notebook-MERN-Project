const express = require('express')
const connectToMongo = require('./db')

const app = express()
const port = 3000
connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})