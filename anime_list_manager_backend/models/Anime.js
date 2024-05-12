var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AnimeSchema = new Schema({
  name: { type: String },
  episode: { type: Number },
  status: { type: String, default: "To Watch" },
  image: { type: String },
});

module.exports = mongoose.model("Anime", AnimeSchema);
