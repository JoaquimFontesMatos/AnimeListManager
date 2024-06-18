var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MangaSchema = new Schema({
  title: { type: String },
  totalChapters: { type: Number },
  currentChapter: { type: Number },
  mangaStatus: { type: String },
  myStatus: { type: String, default: "To Watch" },
  genres: [{ type: String }],
  image: { type: String },
});

module.exports = mongoose.model("Manga", MangaSchema);