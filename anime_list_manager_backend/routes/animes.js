var express = require("express");
var router = express.Router();
var animeController = require("../controllers/animes_controller.js");

/* GER product listing. */
router.get("/animes", animeController.getAllAnimes);
router.post("/animes", animeController.createAnimes);

router.get("/anime/:animeId", animeController.getOneAnime);
router.put("/anime/:animeId", animeController.updateAnime);
router.delete("/anime/:animeId", animeController.deleteAnime);

router.param("animeId", animeController.getByIdAnime);

module.exports = router;