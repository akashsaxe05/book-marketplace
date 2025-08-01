const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/booksdb");
const userSchema = mongoose.Schema({
    bookname:String,
    price:Number,
    author:String,
    category: String,
    image:String
    
});
module.exports = mongoose.model('book',userSchema);