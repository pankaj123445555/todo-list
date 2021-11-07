const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
   description:{
       type: String,
       required: true
   },
   work: {
       type : String,
       required: true
   },
   date: {
       type: String,
       required: true
   }
});
const Works = mongoose.model('works',contactSchema);
module.exports = Works;