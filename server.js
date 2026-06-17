global.crypto = require('crypto');
const express = require('express');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

// Import Controllers
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize MongoDB Connection
connectDB();

// Middleware Framework Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set Up View Templating Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Core User Interface Routing Paths
app.get('/', productController.getAllProducts); // Homepage Catalog
app.get('/product/:id', productController.getProductById); // Specs Profile Page
app.get('/cart', (req, res) => res.render('cart')); // Shopping Cart Page
app.get('/checkout', (req, res) => res.render('checkout')); // Checkout Page

// Backend Order API Route Ingestion Endpoint
app.post('/api/orders', orderController.createOrder);

// Run Application Server
app.listen(PORT, () => {
    console.log(`🚀 electronics shop server running smoothly at: http://localhost:${PORT}`);
});