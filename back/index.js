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
    result =result.toObject()
    delete result.password
    resp.send(result)
})

app.post("/login", async (req,res) => {
    if (req.body.password && req.body.email) {        
        let user = await Users.findOne(req.body).select('-password')    
        if(user) {
            res.send(user)
        }else {
            res.send({result : "no user found"})
        }
    } else {
        res.send({result : "check email and password"})
    }
} )
app.listen(5000);