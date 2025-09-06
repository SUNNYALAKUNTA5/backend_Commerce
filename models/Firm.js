const mongoose = require('mongoose');
const Product = require('./Product');

const firmSchema = new mongoose.Schema({
    firmname:{
        type: String,
        required: true,
        unique: true    
    },
    area:{
        type: String,
        required: true
    },
    category:{
        type:[
            {
                type: String,
                enum:['veg', 'non-veg']
            }
        ],
    },
    region:{
        type:[
            {
                type: String,
                enum:['north-indian', 'south-indian', 'chinese', 'bakery']
            }
        ]
    },
    offer:{
        type: String,
    },
    image:{
        type: String,
    },
    vendor:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Vendor'
        }
    ],
    Products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

const Firm = mongoose.model('Firm',firmSchema);

module.exports = Firm;
