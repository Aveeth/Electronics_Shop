// Expose the native crypto module globally for the MongoDB database driver inside Docker
global.crypto = require('crypto');

const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
    {
        name: "Asus ZenBook Laptop 14\"",
        description: "An elegant, lightweight developer workstation optimized for long battery life and compiling heavy programs on the go.",
        price: 850000,
        category: "Laptops",
        imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
        stock: 8,
        specs: { brand: "ASUS", processor: "AMD Ryzen 7", ram: "16GB DDR5" }
    },
    {
        name: "Keychron Mechanical Wireless Keyboard",
        description: "Tactile typing experience featuring fully customizable hot-swappable switches, wireless connectivity, and an aluminum frame.",
        price: 120000,
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500",
        stock: 25,
        specs: { brand: "Keychron", processor: "N/A", ram: "N/A" }
    },
    {
        name: "Dell UltraSharp 4K Monitor 27\"",
        description: "Stunning color-accurate monitor with brilliant IPS clarity, ideal for video rendering, designers, and dual-window multitasking setups.",
        price: 430000,
        category: "Monitors",
        imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
        stock: 5,
        specs: { brand: "Dell", processor: "N/A", ram: "N/A" }
    }
];

const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/electronics_shop';

mongoose.connect(dbURI)
    .then(async () => {
        // Clear out existing sample product sets to avoid double seeding
        await Product.deleteMany({});
        // Insert sample array items
        await Product.insertMany(sampleProducts);
        console.log("🌱 Database successfully seeded with high-quality electronics components!");
        process.exit();
    })
    .catch(err => {
        console.error("❌ Seeding database failed:", err);
        process.exit(1);
    });