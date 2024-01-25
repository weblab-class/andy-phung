const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
  name: String,
  personality: String,
  rare: Boolean,
  rareAttribution: String,
});

// compile model from schema
module.exports = mongoose.model("cat", CatSchema);
