// connect mongdb
// Import
let mongoose = require("mongoose");

// Create a model class

let questionModel = mongoose.Schema(
  {
    questioner: String,
    question: String,
    response: String,
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    collection: "question",
  }
);

module.exports = mongoose.model("Question", questionModel);
