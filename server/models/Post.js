const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    
   freetitle: {
        type: String
   },
    freecontent: {
        type: String
    }

}, { timestamps: true })


const Post = mongoose.model('Post', postSchema);

module.exports = { Post }
