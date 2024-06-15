var express = require("express");
var router = express.Router();
var mangaController = require("../controllers/mangaController");

/* GER product listing. */
router.get("/mangas", mangaController.getAllMangas);
router.post("/mangas", mangaController.createManga);

router.get("/manga/:mangaId", mangaController.getOneManga);
router.put("/manga/:mangaId", mangaController.updateManga);
router.delete("/manga/:mangaId", mangaController.deleteManga);

router.param("mangaId", mangaController.getByIdManga);

module.exports = router;
