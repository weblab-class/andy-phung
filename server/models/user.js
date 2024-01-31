const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  biscuits: Number,
  pfp: String,
  bio: String,
  pics: [String],
  favPics: [String],
  achievements: [String],
  tasksCompleted: Number,
  sessionsCompleted: Number,
  toysBought: [String],
  sfxVolume: Number,
  musicVolume: Number,
  notifications: Boolean,
  themesUnlocked: [String],
  catsSeen: [String],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
