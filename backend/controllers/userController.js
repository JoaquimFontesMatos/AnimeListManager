var User = require("../models/User");
var bcrypt = require("bcryptjs");

var userController = {};

userController.updateUser = async (req, res) => {
  var id = req.userId;
  var userUpdates = req.body;

  if (!id || !userUpdates) {
    return res.status(400).send("No ID or user updates given");
  }

  userUpdates.updatedAt = Date.now();

  try {
    var updatedUser = await User.findByIdAndUpdate(
      { $eq: id },
      userUpdates ,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      var error;

      if (Object.keys(err.keyPattern)[0] === "username") {
        error = "Username Already Used";
      } else if (Object.keys(err.keyPattern)[0] === "email") {
        error = "Email Already Used";
      }

      console.log(error);
      res.status(409).json({ message: error });
    }
    res.status(500).send("Error updating User");
  }
};

userController.addFavoriteManga = async (req, res) => {
  let user = req.user;

  const newFavoriteManga = req.body;

  if (!user._id || !newFavoriteManga || !newFavoriteManga.mal_id) {
    return res.status(400).send("Invalid user ID or favorite manga data");
  }

  const isMangaAlreadyAdded = user.favoriteManga.some(
    (manga) => manga.mal_id === newFavoriteManga.mal_id
  );
  if (isMangaAlreadyAdded) {
    return res.status(409).send("Manga already exists in favorites");
  }

  try {
    // Add new favorite manga to the user's favoriteManga array only if it doesn't already exist
    const updatedUser = await User.findByIdAndUpdate(
      { $eq: user._id },
      {
        $addToSet: { favoriteManga: newFavoriteManga },
      },
      { new: true, runValidators: true } // Ensure validation is run on update and return the updated document
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating User's favorite manga:", err);
    res.status(500).send("Error updating User's favorite manga");
  }
};

userController.deleteUser = async (req, res) => {
  var user = req.user;

  if (!user) {
    return res.status(400).send("No user given");
  }

  try {
    await User.findByIdAndDelete({ $eq: user._id });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Deleting User");
  }
};

userController.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    var foundUsers = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    res.status(200).json(foundUsers);
  } catch (err) {
    res.status(500).send("Error Finding Users");
  }
};

userController.getOneUser = (req, res) => {
  var user = req.user;

  if (!user) {
    return res.status(400).send("No user given");
  }

  res.status(200).json(user);
};

userController.getUserById = async (req, res, next) => {
  try {
    var user = await User.findById({ $eq: req.userId });
    if (!user) {
      return res.status(404).send("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.user === "CastError") {
      return res.status(400).send("Invalid ID format");
    }
    res.status(500).send("Error finding User");
    next(err);
  }
};

module.exports = userController;
