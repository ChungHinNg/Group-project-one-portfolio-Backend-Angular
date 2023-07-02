var express = require("express");
var router = express.Router();

let questionController = require("../controllers/question");
let authController = require("../controllers/auth");

/* GET list of questions */
router.get("/", questionController.questionList);

// Routers for adding a question
router.post("/add", questionController.processAdd);

// Routers for edit the question, i.e. add an answer

router.put(
  "/edit/:id",
  authController.requireAuth,
  authController.isOwner,
  questionController.processEdit
);

module.exports = router;
