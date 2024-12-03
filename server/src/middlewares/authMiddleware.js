const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT
exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ message: "Authentication token is required" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decoded; // Attach user info from token
    next(); // Proceed to the next middleware or route
  });
};

// const jwt = require("jsonwebtoken");

// exports.authenticateJWT = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

//   if (!token) {
//     return res.status(403).json({ message: "Access token is missing" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     req.user = decoded; // Add user info to request
//     next();
//   });
// };
