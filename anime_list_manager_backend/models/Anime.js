var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AnimeSchema = new Schema({
  name: { type: String },
  episode: { type: Number },
  status: { type: String, default: "To Watch" },
});

module.exports = mongoose.model("Anime", AnimeSchema);
