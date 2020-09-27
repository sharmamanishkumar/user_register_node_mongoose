const mongoose = require("mongoose");

const userdetailSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  city: { type: String, required: true },
  mobileno: { type: String, required: true },
  dob: { type: String, required: true },
});

module.exports = mongoose.model("Userdetail", userdetailSchema);