var mongoose = require("mongoose");
var Manga = require("../models/Manga");
var User = require("../models/User");

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
    if (err.code === 11000) {
      var error;

      if (Object.keys(err.keyPattern)[0] === "malId") {
        error = "MalId Already Used";
      }

      console.log(error);
      res.status(409).json({ message: error });
    } else {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

mangaController.updateManga = async (req, res) => {
  var id = req.params.mangaId;
  var mangaUpdates = req.body;

  if (!id || !mangaUpdates) {
    return res.status(400).send("No ID or manga updates given");
  }

  try {
    var updatedManga = await Manga.findByIdAndUpdate(
      { $eq: id },
      { $eq: mangaUpdates },
      {
        new: true,
      }
    );
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
    await Manga.findByIdAndDelete({ $eq: manga._id });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Deleting Manga");
  }
};

mangaController.getAllMangas = async (req, res) => {
  try {
    // Perform the aggregation to look up mangas by `malId`
    const foundMangas = await User.aggregate([
      { $match: { _id: { $eq: req.user._id } } },
      {
        $unwind: "$favoriteManga",
      },
      {
        $lookup: {
          from: "mangas",
          localField: "favoriteManga.malId",
          foreignField: "malId",
          as: "mangas",
        },
      },
      {
        $unwind: "$mangas",
      },
      {
        $project: {
          _id: 0,
          userMangas: {
            manga: "$mangas",
            favoriteManga: "$favoriteManga",
          },
        },
      },
      {
        $group: {
          _id: null,
          userMangas: {
            $push: "$userMangas",
          },
        },
      },
      {
        $project: {
          _id: 0,
          userMangas: 1,
        },
      },
    ]).exec();

    res.status(200).json(foundMangas[0].userMangas);
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
    var manga = await Manga.findById({ $eq: id });
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

mangaController.getByMalIdManga = async (req, res) => {
  try {
    let malId = req.params.malId;

    var manga = await Manga.findOne({ malId: { $eq: malId } });

    if (!manga) {
      return res.status(200).send(false);
    }
    res.status(200).send(true);
  } catch (err) {
    res.status(500).send("Error finding Manga");
  }
};

module.exports = mangaController;
