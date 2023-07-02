let Post = require('../models/post');

function getErrorMessage(err) {    
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } 
    if (err.message) {
        return err.message;
    } else {
        return 'Unknown server error';
    }
};

exports.home = function(req, res, next) {
    // do post display
    Post.find((err, postList)=>{
        if(err){
            console.error(err);

            res.status(400).json(
                {
                    success: false,
                    message: getErrorMessage(err)
                }
            );
        }
        else{
            // res.render('index', {
            //     title: 'Home',
            //     PostList: postList
            // });
            res.status(200).json(postList);
        }
    });
};

