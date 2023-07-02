// needa update for db related things, process, and delete.
let Post = require("../models/post");

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

//Get postList
module.exports.postList = async function (req, res, next) {
  try {
    let postList = await Post.find().populate({
      path: 'owner',
      select: 'firstName lastName email username admin created'
    });

    res.status(200).json(postList);
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

    let updatedItem = Post({
      _id: id,
      title: req.body.title,
      picture: req.body.picture,
      price: req.body.price,
      description: req.body.description,
      status: req.body.status,
      startDate: req.body.startDate,
      expireDate: req.body.expireDate,
      owner:
        req.body.owner == null || req.body.owner == ""
          ? req.payload.id
          : req.body.owner,
    });

    Post.updateOne({ _id: id }, updatedItem, (err, result) => {
      if (err || result.modifiedCount == 0) {
        console.log(err);

        res.status(400).json({
          success: false,
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Post updated successfully.",
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

// Process Add Page
module.exports.processAdd = (req, res, next) => {
  try {
    let newItem = Post({
      _id: req.body.id,
      title: req.body.title,
      picture: req.body.picture,
      price: req.body.price,
      description: req.body.description,
      status: req.body.status,
      startDate: req.body.startDate,
      expireDate: req.body.expireDate,
      owner:
        req.body.owner == null || req.body.owner == ""
          ? req.payload.id
          : req.body.owner,
    });

    Post.create(newItem, (err, item) => {
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
  }catch (error) {
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    } 
};

// Perform Disable on a product

module.exports.performDelete = (req, res, next) => {
  try {
    let id = req.params.id;

    Post.updateOne({ _id: id }, {status: 'Disable'}, (err, result) => {
      if (err || result.modifiedCount == 0) {
        console.log(err);

        res.status(400).json({
          success: false,
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Post disabled successfully.",
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
