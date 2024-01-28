const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
  name: String,
  personality: String,
  attribution: String,
  rare: Boolean,
});

// compile model from schema
module.exports = mongoose.model("cat", CatSchema);
