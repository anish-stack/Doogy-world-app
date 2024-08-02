const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    CategoryTitle: {
        type: String,
        required: [true, "Please provide a category title"],
        trim: true
    },
    Image: {
        url: {
            type: String,
            required: [true, "Please provide an image URL"]
        },
        PublicId: {
            type: String,
            required: [true, "Please provide the public ID"]
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
