const express = require("express");
const app = express()
const path = require('path')
//DB
const dbConnect = require('./dbConnect')

// use user routes
const userRoutes = require('./routes/userRoutes')

//use transaction routes
const transactionRoutes = require('./routes/transactionsRoutes');

//CROSS ORIGIN RESOURCE
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration
app.use(express.json())

const port = process.env.PORT || 3080;



app.use('/api/users/',userRoutes)
app.use('/api/transactions/',transactionRoutes)

app.get('/',(req,res)=>{
    // console.log("home")
    res.send("M3 backend")
})

app.listen(port,()=>{
    console.log(`App live at port ${port}\nhttp://localhost:${port}`)
})
