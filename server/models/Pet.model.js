const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    PetImage: {
        type: String,
    },
    PetName: {
        type: String,
        required: [true, "Please provide Pet Name"],
        trim: true,
    },
    PetType: {
        type: String,
        required: [true, "Please provide Pet Type"],
        trim: true,
        enum: ["Cat", "Dog"]
    },
    PetBreed: {
        type: String,
        required: [true, "Please provide Pet Breed"],
        trim: true,
    },
    PetGender: {
        type: String,
        required: [true, "Please provide Pet Gender"],
        trim: true,
        enum: ["Male", "Female"]
    },
    PetWeight: {
        type: String,
        required: [true, "Please provide Pet Weight"],
        trim: true,
    },
    PetsFoodPreferred: {
        type: String,
        trim: true,
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Pet', PetSchema);
