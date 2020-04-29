const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

const { auth } = require("../middleware/auth");

//=================================
//             Subscribe
//=================================


router.post("/saveComment", (req, res) => {

    const comment = new Comment(req.body) //인스턴스 생성해서 저장

    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': comment._id })
            .populate('writer') // populate는  find가 있어야 사용가능
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })

})

router.post("/getComments", (req, res) => {

    Comment.find({ "postId": req.body.postId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })

});




module.exports = router;
