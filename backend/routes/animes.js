var express = require("express");
var router = express.Router();
var animeController = require("../controllers/animeController");

/**
 * Get List of Animes in Database
 */
router.get("/animes", animeController.getAllAnimes);

/**
 * Save an Anime to the Database
 */
router.post("/animes", animeController.createAnime);

/**
 * Get the Anime with the given Id from the Database
 */
router.get("/anime/:animeId", animeController.getOneAnime);

/**
 * Update the Anime with the given Id from the Database
 */
router.put("/anime/:animeId", animeController.updateAnime);

/**
 * Delete the Anime with the given Id from the Database
 */
router.delete("/anime/:animeId", animeController.deleteAnime);

/**
 * Param to be used when you need the Anime and you have the id
 */
router.param("animeId", animeController.getByIdAnime);

module.exports = router;
