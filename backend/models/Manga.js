var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MangaSchema = new Schema({
  mal_id: { type: Number },
  title: { type: String },
  score: { type: Number },
  synopsis: { type: String },
  totalChapters: { type: Number },
  currentChapter: { type: Number },
  mangaStatus: { type: String },
  myStatus: { type: String, default: "To Watch" },
  genres: [{ type: String }],
  image: { type: String },
  themes: [{ type: String }],
  published: {
    from: { type: Date },
    prop: {
      from: {
        day: { type: Number },
        month: { type: Number },
        year: { type: Number },
      },
      to: {
        day: { type: Number },
        month: { type: Number },
        year: { type: Number },
      },
    },
    string: { type: String },
    to: { type: Date },
  },
  type: { type: String },
  dateEdited: { type: Date },
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Manga", MangaSchema);
