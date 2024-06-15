var mongoose = require("mongoose");
var Anime = require("../models/Anime");

var animeController = {};

animeController.createAnime = async (req, res) => {
  if (!req.body) {
    return res.status(400).send("No anime given");
  }

  var anime = new Anime(req.body);

  try {
    var savedAnime = await anime.save();
    res.status(201).json(savedAnime);
  } catch (err) {
    res.status(500).send("Error Saving Anime: " + err.message);
    console.error(err);
  }
};

animeController.updateAnime = async (req, res) => {
  var id = req.params.animeId;
  var animeUpdates = req.body;

  if (!id || !animeUpdates) {
    return res.status(400).send("No ID or anime updates given");
  }

  try {
    var updatedAnime = await Anime.findByIdAndUpdate(id, animeUpdates, {
      new: true,
    });
    if (!updatedAnime) {
      return res.status(404).send("Anime not found");
    }
    res.status(200).json(updatedAnime);
  } catch (err) {
    res.status(500).send("Error updating Anime");
  }
};

animeController.deleteAnime = async (req, res) => {
  var anime = req.anime;

  if (!anime) {
    return res.status(400).send("No anime given");
  }

  try {
    await Anime.findByIdAndDelete(anime._id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Deleting Anime");
  }
};

animeController.getAllAnimes = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    var foundAnimes = await Anime.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    res.status(200).json(foundAnimes);
  } catch (err) {
    res.status(500).send("Error Finding Animes");
  }
};

animeController.getOneAnime = (req, res) => {
  var anime = req.anime;

  if (!anime) {
    return res.status(400).send("No anime given");
  }

  res.status(200).json(anime);
};

animeController.getByIdAnime = async (req, res, next, id) => {
  try {
    var anime = await Anime.findById(id);
    if (!anime) {
      return res.status(404).send("Anime not found");
    }
    req.anime = anime;
    next();
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).send("Invalid ID format");
    }
    res.status(500).send("Error finding Anime");
    next(err);
  }
};

module.exports = animeController;
