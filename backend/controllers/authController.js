var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../jwt_secret/config");
var User = require("../models/User");

var authController = {};

authController.login = async function (req, res) {
  try {
    const user = await User.findOne({ email: { $eq: req.body.email } });

    if (!user) {
      return res.status(404).send({ message: "User not Found!" });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(404).send({
        auth: false,
        token: null,
        message: "Invalid Password or Email!",
      });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400,
    });

    res.status(200).send({ auth: true, token: token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

authController.logout = function (req, res) {
  res.status(200).send({ auth: false, token: null });
};

authController.register = async function (req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = new User(req.body);

    user.password = hashedPassword;
    var savedUser = await user.save();
    console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    if (err.code === 11000) {
      var error;

      if (Object.keys(err.keyPattern)[0] === "username") {
        error = "Username Already Used";
      } else if (Object.keys(err.keyPattern)[0] === "email") {
        error = "Email Already Used";
      }

      console.log(error);
      res.status(409).json({ message: error });
    } else {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

authController.verifyToken = function (req, res, next) {
  let token = req.headers["x-access-token"];

  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id;
    next();
  });
};

module.exports = authController;
