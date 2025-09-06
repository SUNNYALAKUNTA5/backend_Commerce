
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./configuration/DB');

const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');

connectDB();

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Server Running...');
});

app.use('/vendor', vendorRoutes);

app.use('/firm', firmRoutes);

app.use('/product', productRoutes);

app.use('/uploads', express.static('uploads'));