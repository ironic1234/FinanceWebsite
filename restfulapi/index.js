const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = 3000
const db = require("./queries")

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
	extended: true,
    })
)

app.get('/data', cors(), db.getAllData)

app.listen(port, () =>{
    console.log('app running on port 3000')
})
