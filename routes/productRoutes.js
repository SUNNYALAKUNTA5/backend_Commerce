const productRoutes = require('../controllers/productController');
const express = require('express');
const router = express.Router();

router.post('/add/:firmId', productRoutes.addProduct);
router.get('/:firmId/products', productRoutes.getProductsByFirm);
router.delete('/delete/:productId', productRoutes.deleteProduct);
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(Path2D.join(__dirname,'..','uploads', imageName));
});
module.exports = router;
