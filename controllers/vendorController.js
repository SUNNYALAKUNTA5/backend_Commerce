const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const secretkey = process.env.JWT_SECRET;

const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try{
        const vendorEmail = await Vendor.findOne({email});
        if (vendorEmail){
            return res.status(400).json(`${email} already exists`);
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const newVendor = new Vendor({
            username,
            email,
            password: hashedpassword,
            Firm: []
        });
        await newVendor.save();

        console.log('Vendor registered: ', newVendor);
        
        return res.status(201).json("Vendor registered successfully"); 
    }catch(err){
        console.log('Error registering vendor:', err);
        return res.status(500).json({message: "Internal server error", error: err.message});
    }
}

const vendorLogin = async (req, res) => {
    const {email, password} = req.body;
    try{
       const vendor_user = await Vendor.findOne({email});
       if (!vendor_user || !(await bcrypt.compare(password, vendor_user.password))){
        return res.status(401).json({message: "Invalid credentials"});
       }
       const token = jwt.sign({vendorId:vendor_user._id},secretkey,{expiresIn: '1h'});
       console.log(token);
       return res.status(200).json({message:"Login successful", token});
    }catch(err){
        console.log('Error logging in vendor:', err.message);
        return res.status(500).json({message: "Internal server error", error: err.message});
    }
}

const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate('Firm');
        return res.status(200).json({ vendors });
    } catch (err) {
        console.log('Error fetching vendors:', err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

const getVendorById = async (req,res) => {
    const vendorId = req.params.id;
    try {
        const vendor = await Vendor.findById(vendorId).populate('Firm');
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        return res.status(200).json({ vendor });
    } catch (error) {
        console.log('Error fetching vendor:', error.message);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const deleteVendor = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedVendor = await vendor.findByIdAndDelete(id);
        if (!deletedVendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        return res.status(200).json({ message: "Vendor deleted successfully" });
    } catch (err) {
        console.log('Error deleting vendor:', err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}


module.exports = {vendorRegister, vendorLogin, getAllVendors, deleteVendor, getVendorById};