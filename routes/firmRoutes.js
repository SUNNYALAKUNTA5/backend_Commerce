const express = require('express');
const firmController = require('../controllers/firmController');
const router = express.Router();         

const verifyToken = require('../middlewares/verifytokens');

router.post('/add-firm',verifyToken, firmController.addFirm);

router.delete('/delete-firm/:firmId',verifyToken, firmController.deleteFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(Path2D.join(__dirname,'..','uploads', imageName));
});


module.exports = router;