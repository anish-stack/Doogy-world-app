const Product = require('../models/Products.model');
const {uploadImage} = require('../middlewares/CloudinaryUpload');
const CatchAsync = require('../middlewares/CatchAsync');
const ApiResponse = require('../utils/ApiResponse');

// Create Product
exports.CreateProduct = CatchAsync(async (req, res) => {
    try {
        console.log(req.files)
        console.log(req.body)

        // Extract and validate image files
        const imageFiles = req.files;
        if (!imageFiles || imageFiles.length === 0) {
            return ApiResponse.error(res, "Please choose at least one image", 400);
        }

        // Extract and validate product details from request body
        const { ProductName, PackSizes, DetailsDataL, Category, BrandName, SuitedFor, Flavours, BreedSize, ItemForm, PetType } = req.body;

        const missingFields = [];
        if (!ProductName) missingFields.push("ProductName");
        // if (!PackSizes) missingFields.push("PackSizes");
        // if (!DetailsData) missingFields.push("DetailsData");
        if (!Category) missingFields.push("Category");
        if (!BrandName) missingFields.push("BrandName");
        if (!SuitedFor) missingFields.push("SuitedFor");
        if (!Flavours) missingFields.push("Flavours");
        if (!BreedSize) missingFields.push("BreedSize");
        if (!ItemForm) missingFields.push("ItemForm");
        if (!PetType) missingFields.push("PetType");

        if (missingFields.length > 0) {
            return ApiResponse.error(res, `Missing fields: ${missingFields.join(", ")}`, 400);
        }

        // Upload images to Cloudinary
        const imageUploadPromises = imageFiles.map(file => uploadImage(file));
        const imageResults = await Promise.all(imageUploadPromises);

        const newProduct = new Product({
            ProductName,
            PackSizes,
            DetailsData:DetailsDataL,
            Category,
            BrandName,
            SuitedFor,
            Flavours,
            BreedSize,
            ItemForm,
            PetType,
            ProductImages: imageResults.map(result => ({
                ImageUrl: result?.ImageUrl,
                PublicId: result?.PublicId
            }))
        });

        // Save product to database
        await newProduct.save();

        res.status(201).json({
            success: true,
            message: "success",
            data: newProduct
        })
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(501).json({
            success: false,
            message: "failed",
            error
        })
    }
});

exports.GetAllProducts = CatchAsync(async (req, res) => {
    try {
        const products = await Product.find().populate('Category');
        if (products.length === 0) {
            return res.status(403).json({
                success: false,
                message: "Products Not Available"

            });
        }
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error
        });
    }
});

exports.GetOnlyHaveProductsWhichIsNotOutStock = CatchAsync(async (req, res) => {
    try {
        const products = await Product.find({ inStock: true });
        if (products.length === 0) {
            return res.status(403).json({
                success: false,
                message: "Products Not Available"
            });
        }
        res.status(200).json({
            success: true,
            message: "Available products fetched successfully",
            data: products
        });
    } catch (error) {
        console.error('Error fetching available products:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch available products",
            error
        });
    }
});

exports.GetSingleProduct = CatchAsync(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('Category');;
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Fetch related products by category, excluding the current product
        const relatedProducts = await Product.find({
            Category: product.Category,
            _id: { $ne: req.params.id }
        });

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product,
            relatedProducts: relatedProducts || []
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch product",
            error
        });
    }
});

exports.ProductByCategories = CatchAsync(async (req, res) => {
    try {
        const products = await Product.find({ Category: req.params.category });
        res.status(200).json({
            success: true,
            message: "Products by category fetched successfully",
            data: products
        });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products by category",
            error
        });
    }
});

exports.GetProductsByFilters = CatchAsync(async (req, res) => {
    try {
        // Extract filter parameters from the query string
        const { price, category, createdDate, stock, breedSize, itemForm, flavours, brandName } = req.query;

        // Build the filter object based on provided query parameters
        const filterCriteria = {};

        if (price) {
            filterCriteria.Price = price;
        }
        if (category) {
            filterCriteria.Category = category;
        }
        if (createdDate) {
            filterCriteria.CreatedDate = { $gte: new Date(createdDate) }; // Assuming you want products created on or after the provided date
        }
        if (stock) {
            filterCriteria.Stock = { $gte: parseInt(stock) }; // Assuming stock is a number and you want products with at least the provided stock
        }
        if (breedSize) {
            filterCriteria.BreedSize = breedSize;
        }
        if (itemForm) {
            filterCriteria.ItemForm = itemForm;
        }
        if (flavours) {
            filterCriteria.Flavours = flavours;
        }
        if (brandName) {
            filterCriteria.BrandName = brandName;
        }

        // Fetch products based on the filter criteria
        const products = await Product.find(filterCriteria);

        res.status(200).json({
            success: true,
            message: "Filtered products fetched successfully",
            data: products
        });
    } catch (error) {
        console.error('Error fetching filtered products:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch filtered products",
            error
        });
    }
});

exports.deleteAllProducts = CatchAsync(async (req, res) => {
    try {
        await Product.deleteMany({});
        res.status(200).json({
            success: true,
            message: "All products deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting all products:', error);
        res.status(500).json({
            success: false,
            message: "Failed to delete all products",
            error
        });
    }
});

exports.deleteProductById = CatchAsync(async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting product by ID:', error);
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error
        });
    }
});

exports.deleteAllProductByCategory = CatchAsync(async (req, res) => {
    try {
        await Product.deleteMany({ Category: req.params.category });
        res.status(200).json({
            success: true,
            message: "All products in category deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting products by category:', error);
        res.status(500).json({
            success: false,
            message: "Failed to delete products by category",
            error
        });
    }
});

exports.UpdateProductWithImages = CatchAsync(async (req, res) => {
    try {
        const { productId } = req.params; // Product ID from the request parameters
        const { imagesToUpdate, productData } = req.body; // Images to update and product data fields

        if (!productId) {
            return ApiResponse.error(res, "Product ID is required", 400);
        }

        // Fetch the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return ApiResponse.error(res, "Product not found", 404);
        }

        // Upload new images if present in the request
        const newImages = req.files;
        if (newImages && newImages.length > 0) {
            const imageUploadPromises = newImages.map(file => UploadImage(file));
            const imageResults = await Promise.all(imageUploadPromises);

            // Update the existing images with new ImageUrls
            imagesToUpdate.forEach((imageUpdate) => {
                const { publicId } = imageUpdate;
                const matchingImageResult = imageResults.find(result => result.PublicId === publicId);
                if (matchingImageResult) {
                    const image = product.ProductImages.find(img => img.PublicId === publicId);
                    if (image) {
                        image.ImageUrl = matchingImageResult.ImageUrl;
                    }
                }
            });
        }

        // Update other product fields if provided
        if (productData) {
            Object.keys(productData).forEach(key => {
                if (productData[key] !== undefined) {
                    product[key] = productData[key];
                }
            });
        }

        // Save the updated product
        await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: "Failed to update product",
            error
        });
    }
});