const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function(req, res) {
    db.feedback.findAll().then(function(feedback) {
        ret.json(feedback, res);
    });
});

router.get("/:feedbackID", function(req, res) {
    db.feedback.findByPk(req.params.feedbackID).then(function(feedback) {
        if (feedback) {
            ret.json(feedback, res);
        } else {
            res.end();
        }
    });
});

router.post("/", function(req, res) {
    db.feedback.create({
        name: req.body.name,
        feedback: req.body.feedback,
    }).then(function(feedback) {
        ret.json(feedback, res);
    });
});

router.put("/:feedbackID", function(req, res) {
    db.feedback.findByPk(req.params.feedbackID).then(function(feedback) {
        if (feedback) {
            (feedback.name = req.body.name),
                (feedback.feedback = req.body.feedback),
                feedback.save().then(function(feedback) {
                    ret.json(feedback, res);
                });
        } else {
            res.end();
        }
    });
});

router.delete("/:feedbackID", function(req, res) {
    db.feedback.findByPk(req.params.feedbackID)
        .then(function(feedback) {
            if (feedback) {
                return feedback.destroy();
            } else {
                res.end();
            }
        })
        .then(function() {
            res.end();
        });
});

module.exports = router;