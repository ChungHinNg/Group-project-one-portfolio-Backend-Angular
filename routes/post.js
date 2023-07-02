var express = require('express');
var router = express.Router();

let postController = require('../controllers/post');
let questionController = require('../controllers/question');
let authController = require('../controllers/auth');


/* GET list of items */
router.get('/list', postController.postList);

// Routers for edit
router.put('/edit/:id', authController.requireAuth, authController.isAllowed, postController.processEdit);


// Routers for adding
router.post('/add', authController.requireAuth, postController.processAdd);


// Routers for deleting
router.delete('/delete/:id', authController.requireAuth, authController.isAllowed,  postController.performDelete);


/* GET list of question */
router.get('/details/:id', questionController.questionList);

module.exports = router;