const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  rare: Boolean,
  attribution: String, // if is a real cat (Comet, Michi), their owner
});

// compile model from schema
module.exports = mongoose.model("cat", CatSchema);
