const connectToMongo = require('./db')
const cors = require('cors')
const express = require('express')
const app = express()
const port = 5000

// Available routs
app.use(cors())

app.use(express.json())
app.use("/api/employee", require("./routes/employee"))

app.get('/', (req, res) => {
    res.send('Sign up')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

connectToMongo();