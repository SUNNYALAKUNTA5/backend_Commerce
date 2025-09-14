const Product = require('../models/Product');
const Firm = require('../models/Firm');
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

const addProduct = async (req, res) => {
    try {
        const { productname, description, price, category, stock } = req.body;
        const image = req.file ? req.file.filename : undefined;
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if (!firm) {
            console.log("Firm not found");
            console.log(firmId);
            return res.status(404).json({ message: "Firm not found" });
        }
        const product = new Product({
            productname,
            description,
            price,
            image,
            category,
            stock,
            Firm: firmId
        });
        const savedProduct = await product.save();
        firm.Products.push(savedProduct);
        await firm.save();

        console.log("Product added successfully:", savedProduct);
        res.status(200).json({ message: "Product added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getProductsByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if (!firm) {
            console.log("Firm not found");
            return res.status(404).json({ message: "Firm not found" });
        }
        const allProducts = await Product.find({ Firm: firmId });
        const firmName = firm.firmname;
        console.log(`Products for firm ${firmName}:`, allProducts);
        res.status(200).json({ Restaurant: firmName, products: allProducts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }   
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deleteProduct = await Product.findOneAndDelete({_id:productId});
        if(!deleteProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { addProduct: [upload.single('image'), addProduct], getProductsByFirm, deleteProduct };
