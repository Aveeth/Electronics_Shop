const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., Laptops, Accessories, Monitors
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    specs: {
        brand: { type: String, default: 'Generic' },
        processor: { type: String, default: 'N/A' },
        ram: { type: String, default: 'N/A' }
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);