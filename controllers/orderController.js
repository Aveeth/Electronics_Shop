const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { customerName, email, phone, shippingAddress, items, totalAmount } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: "Your shopping cart is empty." });
        }

        // Map and validate items before saving to database
        const validatedItems = items.map(item => ({
            productId: item.productId || item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })).filter(i => i.productId); // Ensure only items with IDs are processed

        const newOrder = new Order({
            customerName,
            email,
            phone,
            shippingAddress,
            items: validatedItems,
            totalAmount
        });

        await newOrder.save();

        return res.status(201).json({ success: true, message: "Order placed successfully!" });
    } catch (error) {
        console.error("Order processing database error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};