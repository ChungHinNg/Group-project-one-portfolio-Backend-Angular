let passport = require("passport");
let PostModel = require("../models/post");
let QuestionModel = require("../models/question");

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

// helper function for guard purposes
exports.requireAuth = function (req, res, next) {
  passport.authenticate(
    "tokencheck",
    { session: false },
    function (err, user, info) {
      if (err)
        return res.status(401).json({
          success: false,
          message: getErrorMessage(err),
        });
      if (info)
        return res.status(401).json({
          success: false,
          message: info.message,
        });

      req.payload = user;
      next();
    }
  )(req, res, next);
};

// Validates the owner of the item.
exports.isAllowed = async function (req, res, next) {
  try {
    let id = req.params.id;
    let postItem = await PostModel.findById(id).populate("owner");

    // If there is no item found.
    if (postItem == null) {
      throw new Error("Item not found."); // Express will catch this on its own.
    } else if (postItem.owner != null) {
      // If the item found has a owner.

      if (postItem.owner._id != req.payload.id) {
        // If the owner differs, not authorized

        console.log("====> Not authorized");
        return res.status(403).json({
          success: false,
          message: "You are not authorized to do this modification.",
        });
      }
    }

    // If it reaches this point, runs the next middleware.
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

exports.isOwner = async function (req, res, next) {
  try {
    let id = req.params.id;
    let question = await QuestionModel.findById(id).populate("post");
    if (question == null) {
      throw new Error("Question not found."); // Express will catch this on its own.
    } else if (question.post.owner != null) {
      // If the item found has a owner.

      if (question.post.owner._id != req.payload.id) {
        // If the owner differs, not authorized

        console.log("====> Not authorized");
        return res.status(403).json({
          success: false,
          message:
            "You are not authorized to answer this question as you are not the post author.",
        });
      }
    }

    // If it reaches this point, runs the next middleware.
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};
