const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function(req, res) {
    db.review.findAll().then(function(reviews) {
        ret.json(reviews, res);
    });
});

router.get("/:reviewID", function(req, res) {
    db.review.findByPk(req.params.reviewID).then(function(review) {
        if (review) {
            ret.json(review, res);
        } else {
            res.end();
        }
    });
});

router.post("/", function(req, res) {
    db.review.create({
        title: req.body.title,
        comment: req.body.comment,
    }).then(function(review) {
        ret.json(review, res);
    });
});

router.put("/:reviewID", function(req, res) {
    db.review.findByPk(req.params.reviewID).then(function(review) {
        if (review) {
            (review.title = req.body.title),
                (review.comment = req.body.comment),
                review.save().then(function(review) {
                    ret.json(review, res);
                });
        } else {
            res.end();
        }
    });
});

router.delete("/:reviewID", function(req, res) {
    db.review.findByPk(req.params.reviewID)
        .then(function(review) {
            if (review) {
                return review.destroy();
            } else {
                res.end();
            }
        })
        .then(function() {
            res.end();
        });
});

module.exports = router;