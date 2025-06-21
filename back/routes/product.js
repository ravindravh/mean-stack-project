const express = require("express");
const Product = require("../db/Product");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();


router.post("/add-product", verifyToken, async (req, res) => {
    let product = new Product(req.body)
    let result = await product.save();
    res.send(result)
})

router.get("/products", verifyToken, async (req, res) => { 
    let product = await Product.find()
    if (product.length > 0) {
        res.send(product)
    } else {
        res.send({ result: "No data found" })
    }
})

router.delete("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id })
    res.send(result)
})

router.get("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "No data found " })
    }
})

router.put("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )

    res.send(result)

})

router.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key, $options: "i" } },
            { company: { $regex: req.params.key, $options: "i" } },
            { category: { $regex: req.params.key, $options: "i" } }
        ]
    })

    res.send(result)
})


module.exports = router;
