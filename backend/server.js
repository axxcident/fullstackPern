import {config} from 'dotenv';
import pkg from 'pg';
const {Client} = pkg;

import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express'

config()
const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended:true
  })
)
app.use(cors())
app.use(express.json())

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// databas
const client = new Client({
  database: process.env.DATABASE,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  user: process.env.USER
})
client.connect(function(err) {
  if(err) {
    console.log(err)
    throw err
  }
  console.log('Database Connected')
})

app.get("/", (req, res) => {
  res.status(200).json('hello there')
})

app.get("/persons", async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM persons')
    res.status(200).json(result.rows);
  }
  catch(err) {
    res.status(500)
    console.log(err)
  }
})

app.post("/persons/submit-form", async(req, res) => {
  const {FirstName, LastName, Address, City} = req.body;

  try {
    await client.query(
      `INSERT INTO persons(FirstName, LastName, Address, City) VALUES($1, $2, $3, $4)`,
      [FirstName, LastName, Address, City]
    )
    res.sendStatus(201)
  }
  catch(err) {
    res.sendStatus(400)
    console.log(err)
  }
})

app.listen(8800, () => {
  console.log("server is running Bae")
})
