const Product = require('../models/Product');

// Fetch all electronic items from MongoDB and feed them into the homepage catalog
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index', { products });
    } catch (error) {
        console.error("Error fetching catalog items:", error);
        res.status(500).send("Error reading catalog products from the database.");
    }
};

// Fetch a single unique product profile matching an ID parameter string
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("The requested electronic item could not be found.");
        }
        res.render('product', { product });
    } catch (error) {
        console.error("Error fetching product profile:", error);
        res.status(500).send("Error parsing component profile information.");
    }
};