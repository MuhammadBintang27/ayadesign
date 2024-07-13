const ImageCarousel = require('../models/imageModels');

exports.insertData = async (req, res) => {
    const { items } = req.body;
    try {
        await ImageCarousel.insertMany(items);
        res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error });
    }
};

exports.getImageCarousel = async (req, res) => {
    try {
        const imageCarouselItems = await ImageCarousel.find();

        // Memisahkan photocardItems dan bannerItems berdasarkan imageUrl
        const photocardItems = imageCarouselItems.filter(item => item.imageUrl.includes('photocard'));
        const bannerItems = imageCarouselItems.filter(item => item.imageUrl.includes('banner'));

        // Menyediakan response sesuai dengan kebutuhan aplikasi
        res.json({
            photocardItems,
            bannerItems
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

