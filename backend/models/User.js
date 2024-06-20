const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoriteManga: [
    {
      mal_id: { type: Number, required: true },
      watchStatus: { type: String, default: "To Watch" },
      currentChapter: { type: Number, default: 0 },
      _id: false,
    },
  ],
  updatedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
