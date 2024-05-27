import { v2 as cloudinary } from 'cloudinary';
const { CLODINARY_API_KEY, API_SECRET } = process.env;

async function uploadImage(req, res) {
    try {
        // Configuration
        cloudinary.config({
            cloud_name: "decbwosgj",
            api_key: CLODINARY_API_KEY,
            api_secret: API_SECRET // Click 'View Credentials' below to copy your API secret
        });
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
            public_id: "shoes"
        }).catch((error) => { console.log(error) });

        console.log(uploadResult);
        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url("shoes", {
            fetch_format: 'auto',
            quality: 'auto'
        });

        console.log(optimizeUrl);

        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary.url("shoes", {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });

        console.log(autoCropUrl);

        return res.status(201).json({ message: "Data saved successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = uploadImage;