const express = require('express')
require("./db/config")
const Users = require("./db/User")
const cors = require('cors')
const Product = require('./db/Product')
const Jwt = require('jsonwebtoken')
const jwtkey = 'eco'


const app = express()
app.use(cors())
app.use(express.json())


app.post("/register", async (req, resp) => {
    let user = new Users(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    //resp.send(result)
    Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: "something went wrong" })
        }
        resp.send({ result, auth: token })
    })
})

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await Users.findOne(req.body).select('-password')
        if (user) {
            Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "something went wrong" })
                }
                res.send({ user, auth: token })
            })

        } else {
            res.send({ result: "no user found" })
        }
    } else {
        res.send({ result: "check email  and password" })
    }
})

app.post("/add-product", verifyToken, async (req, res) => {
    let product = new Product(req.body)
    let result = await product.save();
    res.send(result)
})

app.get("/products", verifyToken, async (req, res) => {
    let product = await Product.find()
    if (product.length > 0) {
        res.send(product)
    } else {
        res.send({ result: "No data found" })
    }
})

app.delete("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id })
    res.send(result)
})

app.get("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "No data found " })
    }
})

app.put("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )

    res.send(result)

})

app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key, $options: "i" } },
            { company: { $regex: req.params.key, $options: "i" } },
            { category: { $regex: req.params.key, $options: "i" } }
        ]
    })

    res.send(result)
})


function verifyToken(req, res, next) {
    let token = req.headers['authorization']
    if (token) {
        token = token.split(' ')[1]
        console.warn("middleware called", token)
        Jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please provide valid token " })
            } else {
                next()
            }
        })

    } else {
        res.status(403).send({ result: "Please send token with headers" })
    }

}



app.listen(5000);