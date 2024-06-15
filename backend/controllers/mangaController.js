var mongoose = require("mongoose");
var Manga = require("../models/Manga");

var mangaController = {};

mangaController.createManga = async (req, res) => {
  if (!req.body) {
    return res.status(400).send("No manga given");
  }

  var manga = new Manga(req.body);

  try {
    var savedManga = await manga.save();
    res.status(201).json(savedManga);
  } catch (err) {
    res.status(500).send("Error Saving Manga");
  }
};

mangaController.updateManga = async (req, res) => {
  var id = req.params.mangaId;
  var mangaUpdates = req.body;

  if (!id || !mangaUpdates) {
    return res.status(400).send("No ID or manga updates given");
  }

  try {
    var updatedManga = await Manga.findByIdAndUpdate(id, mangaUpdates, {
      new: true,
    });
    if (!updatedManga) {
      return res.status(404).send("Manga not found");
    }
    res.status(200).json(updatedManga);
  } catch (err) {
    res.status(500).send("Error updating Manga");
  }
};

mangaController.deleteManga = async (req, res) => {
  var manga = req.manga;

  if (!manga) {
    return res.status(400).send("No manga given");
  }

  try {
    await Manga.findByIdAndDelete(manga._id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Deleting Manga");
  }
};

mangaController.getAllMangas = async (req, res) => {
  try {
    var foundMangas = await Manga.find();
    res.status(200).json(foundMangas);
  } catch (err) {
    res.status(500).send("Error Finding Mangas");
  }
};

mangaController.getOneManga = (req, res) => {
  var manga = req.manga;

  if (!manga) {
    return res.status(400).send("No manga given");
  }

  res.status(200).json(manga);
};

mangaController.getByIdManga = async (req, res, next, id) => {
  try {
    var manga = await Manga.findById(id);
    if (!manga) {
      return res.status(404).send("Manga not found");
    }
    req.manga = manga;
    next();
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).send("Invalid ID format");
    }
    res.status(500).send("Error finding Manga");
    next(err);
  }
};

module.exports = mangaController;
