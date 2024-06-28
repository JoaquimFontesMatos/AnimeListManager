var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MangaSchema = new Schema({
  mal_id: { type: Number, unique: true, required: true },
  title: { type: String },
  score: { type: Number },
  synopsis: { type: String },
  totalChapters: { type: Number },
  mangaStatus: { type: String },
  genres: [{ type: String }],
  image: {
    smallImage: { type: String },
    mediumImage: { type: String },
    largeImage: { type: String },
  },
  themes: [{ type: String }],
  published: { type: String },
  type: { type: String },
});

module.exports = mongoose.model("Manga", MangaSchema);
