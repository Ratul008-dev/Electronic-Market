import jwt from "jsonwebtoken"
const secretkey = "elctronic-market-secret"

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")

    if (!token) {
        return res.status(401).json({
            message: "Access denied.No token Provided."
        })
    }
    try {
        const decoded = jwt.verify(token, secretkey);
        req.user = decoded;
        next()
    } catch (err) {
        console.log("JWT verification error:", err);
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}
export default authenticateUser