const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productQuantatiti: { type: Number, required: true },  
  dateofexpire:{type:Date , required:true}
});

module.exports = mongoose.model("Product", productSchema);