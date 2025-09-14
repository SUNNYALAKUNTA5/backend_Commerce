
const path = require('path');
const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


const Upload = multer({ storage });

const addFirm = async (req, res) => {
    try{
        const {firmname, area, category, region, offer} = req.body;
        const image = req.file ? req.file.filename: undefined;
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor){
            console.log("Vendor not found", vendor);
            return res.status(404).json({message: 'Vendor not found'});
        }
        const firm = new Firm({
            firmname,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id,
            Products: []
        })
        await firm.save();
        await Vendor.findByIdAndUpdate(vendor._id, 
       { 
        $push: { 
            Firm: firm._id 
        } 
       }, 
       { 
        new: true 
       }
       );
       
        console.log("Firm added successfully:", firm);
        res.status(200).json({message:"firm added successfully"});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}

const deleteFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findByIdAndDelete(firmId);
        if (!firm) {
            return res.status(404).json({ message: "Firm not found" });
        }
        console.log("Firm deleted successfully:", firm);
        res.status(200).json({ message: "Firm deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {addFirm: [Upload.single('image'), addFirm], deleteFirm};
