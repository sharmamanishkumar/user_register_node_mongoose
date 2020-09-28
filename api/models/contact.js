const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  yourName: { type: String, required: true },
  mobile: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model("ContactDetail", contactSchema);