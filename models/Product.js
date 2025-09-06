const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String    },
    category: {

        type: [
            {
                type: String,
                enum: ['veg', 'non-veg'],
                required: true
            }
        ],
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    Firm : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm'
    }]
});

module.exports = mongoose.model('Product', productSchema);