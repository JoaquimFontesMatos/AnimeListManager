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

      if (Object.keys(err.keyPattern)[0] === "mal_id") {
        error = "Mal_id Already Used";
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
    // Get pagination parameters
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    // Perform the aggregation to look up mangas by `mal_id`
    const foundMangas = await User.aggregate([
      {
        $unwind: "$favoriteManga",
      },
      {
        $lookup:
          /**
           * from: The target collection.
           * localField: The local join field.
           * foreignField: The target join field.
           * as: The name for the results.
           * pipeline: Optional pipeline to run on the foreign collection.
           * let: Optional variables to use in the pipeline field stages.
           */
          {
            from: "mangas",
            localField: "favoriteManga.mal_id",
            foreignField: "mal_id",
            as: "mangas",
          },
      },
      {
        $unwind: "$mangas", // Unwind the mangas array
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $project:
          /**
           * specifications: The fields to
           *   include or exclude.
           */
          {
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
          // Group all documents together
          userMangas: {
            $push: "$userMangas",
          }, // Accumulate manga documents into an array
        },
      },
      {
        $project: {
          _id: 0,
          // Exclude the _id field
          userMangas: 1, // Include the mangas array
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

mangaController.getByMalIdManga = async (req, res) => {
  try {
    let malId = req.params.malId;

    var manga = await Manga.findOne({ mal_id: malId });

    if (!manga) {
      return res.status(200).send(false);
    }
    res.status(200).send(true);
  } catch (err) {
    res.status(500).send("Error finding Manga");
  }
};

module.exports = mangaController;
