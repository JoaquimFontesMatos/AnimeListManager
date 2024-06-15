var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MangaSchema = new Schema({
  title: { type: String },
  chapter: { type: Number },
  status: { type: String, default: "To Watch" },
  genres: [{ type: String }],
  image: { type: String },
});

module.exports = mongoose.model("Manga", MangaSchema);