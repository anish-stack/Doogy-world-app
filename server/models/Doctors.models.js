const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    Image: {
        url: {
            type: String,
            required: [true, "Please provide the image URL"]
        },
        PublicId: {
            type: String,
            required: [true, "Please provide the public ID"]
        }
    },
    speciality: {
        type: String,
        required: [true, "Please provide the doctor's speciality"]
    },
    Experience: {
        type: Number,
        required: [true, "Please provide the doctor's experience in years"]
    },
    Name: {
        type: String,
        required: [true, "Please provide the doctor's name"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);
