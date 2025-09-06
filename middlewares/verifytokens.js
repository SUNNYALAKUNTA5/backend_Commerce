const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({error: "Token is required"});
    }
    try {      
        const decoded = jwt.verify(token,JWT_SECRET);
        const vendor = await Vendor.findById(decoded.vendorId);
        if (!vendor) {
            console.log("verify Vendor not found",vendor);
            return res.status(404).json({error: "Vendor not found"});
        }
        req.vendorId = vendor._id;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json("Invalid Token");
    }
}

module.exports = verifyToken;