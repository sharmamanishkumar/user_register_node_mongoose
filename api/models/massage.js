const mongoose = require("mongoose");

const massageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
     massage: { type: String, required: true },
     date: { type: Date, required: true },
     name: { type: String, required: true },
     mobile: { type: String, required: true }
  
});
//passing detail in router
module.exports = mongoose.model("MassegeDetail", massageSchema);