const OffersBanner = require('../models/OffersBanner.model');
const { uploadSingleImage } = require('../middlewares/CloudinaryUpload');
const CatchAsync = require('../middlewares/CatchAsync');
const ApiResponse = require('../utils/ApiResponse');
const Cloudinary = require('cloudinary').v2;
// Create Offer Banner
exports.CreateOfferBanner = CatchAsync(async (req, res) => {
    try {
        const imageFile = req.file;
        if (!imageFile) {
            return ApiResponse.error(res, "Please upload an image", 400);
        }

        const { RedirectAt } = req.body;
        if (!RedirectAt) {
            return ApiResponse.error(res, "Please provide a redirect URL", 400);
        }

        // Upload image to Cloudinary
        const imageResult = await uploadSingleImage(imageFile);

        const newBanner = new OffersBanner({
            Image: {
                url: imageResult.url,
                PublicId: imageResult.public_id
            },
            RedirectAt
        });

        await newBanner.save();
        return ApiResponse.success(res, "Banner created successfully", newBanner, 201);
    } catch (error) {
        console.error('Error creating banner:', error);
        return ApiResponse.error(res, "Failed to create banner", 500, error);
    }
});

// Update Offer Banner
exports.UpdateOfferBanner = CatchAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const { RedirectAt } = req.body;
        const imageFile = req.file;

        const banner = await OffersBanner.findById(id);
        if (!banner) {
            return ApiResponse.error(res, "Banner not found", 404);
        }

        // Update image if provided
        if (imageFile) {
            // Delete old image from Cloudinary
            await cloudinary.v2.uploader.destroy(banner.Image.PublicId);

            // Upload new image to Cloudinary
            const imageResult = await uploadSingleImage(imageFile);
            banner.Image.url = imageResult.url;
            banner.Image.PublicId = imageResult.public_id;
        }

        // Update other fields if provided
        if (RedirectAt) {
            banner.RedirectAt = RedirectAt;
        }

        await banner.save();
        return ApiResponse.success(res, "Banner updated successfully", banner);
    } catch (error) {
        console.error('Error updating banner:', error);
        return ApiResponse.error(res, "Failed to update banner", 500, error);
    }
});

// Delete Offer Banner
exports.DeleteOfferBanner = CatchAsync(async (req, res) => {
    try {
        const { id } = req.params;

        const banner = await OffersBanner.findById(id);
        if (!banner) {
            return ApiResponse.error(res, "Banner not found", 404);
        }

        // Delete image from Cloudinary
        await cloudinary.v2.uploader.destroy(banner.Image.PublicId);

        await banner.remove();
        return ApiResponse.success(res, "Banner deleted successfully");
    } catch (error) {
        console.error('Error deleting banner:', error);
        return ApiResponse.error(res, "Failed to delete banner", 500, error);
    }
});

// Get All Active Banners
exports.GetAllActiveBanners = CatchAsync(async (req, res) => {
    try {
        const banners = await OffersBanner.find({ active: true });
        return ApiResponse.success(res, "Active banners fetched successfully", banners);
    } catch (error) {
        console.error('Error fetching active banners:', error);
        return ApiResponse.error(res, "Failed to fetch active banners", 500, error);
    }
});

// Delete All Banners
exports.DeleteAllBanners = CatchAsync(async (req, res) => {
    try {
        const banners = await OffersBanner.find();
        const deletePromises = banners.map(async banner => {
            await cloudinary.v2.uploader.destroy(banner.Image.PublicId);
            await banner.remove();
        });

        await Promise.all(deletePromises);
        return ApiResponse.success(res, "All banners deleted successfully");
    } catch (error) {
        console.error('Error deleting all banners:', error);
        return ApiResponse.error(res, "Failed to delete all banners", 500, error);
    }
});

// Toggle Active Status
exports.ToggleActiveStatus = CatchAsync(async (req, res) => {
    try {
        const { id } = req.params;

        const banner = await OffersBanner.findById(id);
        if (!banner) {
            return ApiResponse.error(res, "Banner not found", 404);
        }

        banner.active = !banner.active;
        await banner.save();

        return ApiResponse.success(res, `Banner ${banner.active ? 'activated' : 'deactivated'} successfully`, banner);
    } catch (error) {
        console.error('Error toggling banner status:', error);
        return ApiResponse.error(res, "Failed to toggle banner status", 500, error);
    }
});
