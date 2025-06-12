const express = require('express')
require("./db/config")
const Users = require("./db/user")
const app =express()
app.use(express.json())
app.post("/register",async (req,resp) => {
    let user= new Users(req.body)
    let result = await user.save()    
    resp.send(result)
})


app.listen(5000);