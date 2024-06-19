const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoriteManga: [
    {
      id: { type: Schema.Types.ObjectId, ref: "Manga" },
      watchStatus: { type: String, default: "To Watch" },
      currentChapter: { type: Number, default: 0 },
    },
  ],
  updatedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
