const mongoose = require('mongoose');

const SizesSchema = new mongoose.Schema({
    WeightAndPack: {
        type: String,
        required: [true, "Please provide Weight and Pack details"]
    },
    MrpPrice: {
        type: Number,
        required: [true, "Please provide the MRP Price"]
    },
    DiscountPrize: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "Please provide the Discount Price"]
    },
    SizeStock: {
        type: Number,
        required: [true, "Please provide the stock quantity"]
    },
    SizeAvailable: {
        type: Boolean,
        default: true
    }
});

const ProductSchema = new mongoose.Schema({
    ProductImages: [
        {
            ImageUrl: { type: String, required: true },
            PublicId: { type: String, required: true }
        }
    ],
    
    ProductName: {
        type: String,
        required: [true, "Please provide the product name"]
    },
    PackSizes: {
        type: [SizesSchema],
        // required: [true, "Please provide the pack sizes"]
    },
    DetailsData: {
        type: String,
        required: [true, "Please provide product details"]
    },
    Category: {
        type: String,
        required: [true, "Please provide the product category"]
    },
    BrandName: {
        type: String,
        required: [true, "Please provide the brand name"]
    },
    SuitedFor: [
        {
            type: String,
            required: [true, "Please provide the suited animal/breed"]
        }
    ],
    Flavours: {
        type: String,
        required: [true, "Please provide the flavour(s)"]
    },
    BreedSize: {
        type: String,
        required: [true, "Please provide the breed size"]
    },
    ItemForm: {
        type: String
    },
    PetType:{
        type: String
    },
    inStock:{
        type: Boolean,
        default:true
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
