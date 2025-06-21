const express = require("express");
const Jwt = require("jsonwebtoken");
const Users = require("../db/User");
const jwtkey = "eco";

const router = express.Router();

router.post("/register", async (req, res) => {
    let user = new Users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: "something went wrong" });
        } else {
            res.send({ result, auth: token });
        }
    });
});

router.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await Users.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "something went wrong" });
                } else {
                    res.send({ user, auth: token });
                }
            });
        } else {
            res.send({ result: "No user found" });
        }
    } else {
        res.send({ result: "Please provide email and password" });
    }
});

module.exports = router;
