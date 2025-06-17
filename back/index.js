const express = require('express')
require("./db/config")
const Users = require("./db/User")
const cors = require('cors')
const Product =require('./db/Product')
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

app.post("/add-product", async(req, res) => {
    let product = new Product(req.body)
    let result = await product.save();
    res.send(result)
} )

app.get("/products", async(req,res) => {
    let product = await Product.find()
    if(product.length > 0) {
        res.send(product)
    }else {
        res.send({result: "No data found"})
    }
})

app.listen(5000);