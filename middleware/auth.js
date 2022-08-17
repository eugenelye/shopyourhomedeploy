const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", ""); //=> to remove Bearer

    if (token) {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET); //=> return payload
      req.decoded = decoded;
      next();
    } else {
      return res.status(403).send({
        status: "error",
        message: "missing token",
      });
    }
  } catch (error) {
    return res
      .status(401)
      .send({ status: "error", message: "Please login to your account" });
  }
};

module.exports = auth;
