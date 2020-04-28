const express = require('express');
const router = express.Router();
const { Post } = require("../models/Post");

const { auth } = require("../middleware/auth");



router.post("/freeregister", (req, res) => {

    const post = new Post(req.body) //인스턴스 생성해서 저장

    post.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });

})
router.get("/getposts", (req, res) => {

    Post.find()
        .populate('writer')
        .exec((err, posts) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, posts})
        })

})
module.exports = router;
