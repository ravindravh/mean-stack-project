const express = require('express')
require("./db/config")
const Users = require("./db/User")
const cors = require('cors')
const Product = require('./db/Product')
const app = express()
app.use(cors())
app.use(express.json())

app.post("/register", async (req, resp) => {
    let user = new Users(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    resp.send(result)
})

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await Users.findOne(req.body).select('-password')
        if (user) {
            res.send(user)
        } else {
            res.send({ result: "no user found" })
        }
    } else {
        res.send({ result: "check email and password" })
    }
})

app.post("/add-product", async (req, res) => {
    let product = new Product(req.body)
    let result = await product.save();
    res.send(result)
})

app.get("/products", async (req, res) => {
    let product = await Product.find()
    if (product.length > 0) {
        res.send(product)
    } else {
        res.send({ result: "No data found" })
    }
})

app.delete("/product/:id", async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id })
    res.send(result)
})

app.get("/product/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "No data found " })
    }
})

app.put("/product/:id", async (req, res) => {
    let result = await Product.updateOne(
        {_id : req.params.id},
        {
            $set : req.body
        }
    )
    
    res.send(result)

} )

app.get("/search/:key", async(req, res) =>{
    let result = await Product.find({
        "$or": [
            {name : {$regex : req.params.key, $options: "i" }},
            {company : {$regex : req.params.key, $options: "i" }},
            {category : {$regex : req.params.key, $options: "i" }}
        ]
    })

    res.send(result)
} )

app.listen(5000);