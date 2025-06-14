const ImageCarousel = require('../models/imageModels');

exports.insertData = async (req, res) => {
    const { items } = req.body;
    console.log("Insert request received:", items); // ✅ log request data
    try {
        const result = await ImageCarousel.insertMany(items);
        console.log("Insert success:", result); // ✅ log hasil insert
        res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error("Insert error:", error); // ❌ log error
        res.status(500).json({ message: 'Error inserting data', error });
    }
};

exports.getImageCarousel = async (req, res) => {
    console.log("GET /imagecarousel request received"); // ✅ log permintaan GET
    try {
        const imageCarouselItems = await ImageCarousel.find();
        console.log("Fetched items from DB:", imageCarouselItems.length); // ✅ log jumlah item

        const photocardItems = imageCarouselItems.filter(item => item.imageUrl.includes('photocard'));
        const bannerItems = imageCarouselItems.filter(item => item.imageUrl.includes('banner'));

        console.log("Photocard items:", photocardItems.length); // ✅ log jumlah masing-masing
        console.log("Banner items:", bannerItems.length);

        res.json({
            photocardItems,
            bannerItems
        });
    } catch (err) {
        console.error("Error in getImageCarousel:", err); // ❌ log error
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
