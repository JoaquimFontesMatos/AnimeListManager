var mongoose = require("mongoose");
var Anime = require("../models/Anime");

var animeController = {};

animeController.createAnimes = function (req, res, next) {
  var anime = new Anime(req.body);

  anime.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(anime);
    }
  });
};

animeController.updateAnime = function (req, res, next) {
  Anime.findByIdAndUpdate(
    req.params.animeId,
    req.body,
    { new: true },
    function (err, anime) {
      if (err) {
        next(err);
      } else {
        res.json(anime);
      }
    }
  );
};

animeController.deleteAnime = function (req, res, next) {
  req.anime.remove(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(req.anime);
    }
  });
};

animeController.getAllAnimes = function (req, res, next) {
  Anime.find(function (err, animes) {
    if (err) {
      next(err);
    } else {
      res.json(animes);
    }
  });
};

animeController.getOneAnime = function (req, res) {
  res.json(req.anime);
};

animeController.getByIdAnime = function (req, res, next, id) {
  Anime.findOne({ _id: id }, function (err, anime) {
    if (err) {
      next(err);
    } else {
      req.anime = anime;
      next();
    }
  });
};

module.exports = animeController;
