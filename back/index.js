const express = require('express')
require("./db/config")
const Users = require("./db/user")
const cors = require('cors')
const app =express()
app.use(cors())
app.use(express.json())
app.post("/register",async (req,resp) => {
    let user= new Users(req.body)
    let result = await user.save()    
    resp.send(result)
})

app.listen(5000);