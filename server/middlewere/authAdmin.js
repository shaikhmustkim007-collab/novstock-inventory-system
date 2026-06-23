import jwt from "jsonwebtoken";

const isAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //CHECK IF ROLE IS ADMIN
    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied. Admin Only!",
      });
    }

    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "authAdmin Error",
    });
  }
};

export default isAdmin;
