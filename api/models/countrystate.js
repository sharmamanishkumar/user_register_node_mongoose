const mongoose = require("mongoose");

const CountrySehema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  countryName: { type: String, required: true },
  stateName: { type: String, required: true },
});

module.exports = mongoose.model("Country", CountrySehema);