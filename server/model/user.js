const mongoose = require('mongoose');
require("dotenv").config();
const pathdb=process.env.MONGODB_URL;
mongoose.connect(pathdb).then(()=>{

}).catch((error)=>{
     throw error;
});
const userSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);