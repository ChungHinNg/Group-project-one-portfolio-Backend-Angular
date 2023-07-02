// connect mongdb
// Import
let mongoose = require("mongoose");

// Create a model class

let postModel = mongoose.Schema(
    {
        title: String,
        picture: String,
        price: Number,
        description: String,
        status: { 
            type: String,
            enum: ['Active', 'Disable'],
            default: 'Active'
        },
        startDate: Date,
        // startDate : Number,
        expireDate: Date,
        // Adds relationship with User
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        collection: 'post'
    }
);

module.exports = mongoose.model('Post', postModel);