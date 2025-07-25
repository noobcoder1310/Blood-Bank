const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Authorization token missing",
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).send({
          success: false,
          message: "Auth failed",
        });
      } else {
        // ✅ Attach decoded values to req.user
        req.user = {
          userId: decoded.userId,
          role: decoded.role,         // if role was included while creating token
          organisation: decoded.organisation, // optional
        };
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Auth error",
      error,
    });
  }
};
