import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const token = req.cookies.token; // Cookie-parser se token nikal rahi hi

  console.log("cookies:", req.cookies);
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Not Authorised. please Login Again",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check karta hai ki token mein kya hai
    if (tokenDecode.userId) {
      req.userId = tokenDecode.userId; // Yeh approach best hai re.body.userID likhne se data leak ho sakta hai
      next();
    } else {
      return res.status(400).json({
        success: false,
        message: "Not Authorized. Invailid Token",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Not Authorized. Token invalid or expired.",
    });
  }
};

export default authUser;
