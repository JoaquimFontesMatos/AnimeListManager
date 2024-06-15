var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AnimeSchema = new Schema({
  title: { type: String },
  episode: { type: Number },
  status: { type: String, default: "To Watch" },
  genres: [{ type: String }],
  image: { type: String },
});

module.exports = mongoose.model("Anime", AnimeSchema);
