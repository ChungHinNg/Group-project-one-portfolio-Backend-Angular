// needa update for db related things, process, and delete.
let Question = require("../models/question");

function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  }
  if (err.message) {
    return err.message;
  } else {
    return "Unknown server error";
  }
}

//Get questionList
module.exports.questionList = async function (req, res, next) {
  try {
    let questionList = await Question.find().populate();

    res.status(200).json(questionList);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

// Process Add Page
module.exports.processAdd = (req, res, next) => {
  try {
    let postId = req.params.postId;
    console.log(postId);
    let newItem = Question({
      _id: req.body.id,
      question: req.body.question,
      questioner: req.body.questioner,
      post: req.body.post,
    });

    Question.create(newItem, (err, item) => {
      if (err) {
        console.log(err);
        // res.end(err);
        res.status(400).json({
          success: false,
          message: getErrorMessage(err),
        });
      } else {
        // refresh the  list
        console.log(item);
        // res.redirect('/');
        res.status(200).json(item);
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

// Process Edit Page
module.exports.processEdit = (req, res, next) => {
  try {
    let id = req.params.id;
    let update = {
      response: req.body.response,
    };

    Question.findOneAndUpdate({ _id: id }, update, (err, result) => {
      if (err || result.modifiedCount == 0) {
        console.log(err);

        res.status(400).json({
          success: false,
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Answer is added successfully.",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};
