const mongoose = require('mongoose');

const ClinicSchema = new mongoose.Schema({
    Images: [
        {
            url: {
                type: String,
                required: [true, "Please provide the image URL"]
            },
            PublicId: {
                type: String,
                required: [true, "Please provide the public ID"]
            }
        }
    ],
    OpensAndCloseTime: {
        type: String,
        required: [true, "Please provide the opening and closing times"]
    },
    ContactNumber: {
        type: String,
        required: [true, "Please provide a contact number"]
    },
    Doctors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: [true, "Please provide at least one doctor"]
        }
    ],
    Services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: [true, "Please provide at least one service"]
        }
    ],
    longitude: {
        type: Number,
        required: [true, "Please provide the longitude"]
    },
    latitude: {
        type: Number,
        required: [true, "Please provide the latitude"]
    },
    Address: {
        OfficeNo: {
            type: String,
            required: [true, "Please provide the office number"]
        },
        Landmark: {
            type: String,
            required: [true, "Please provide the landmark"]
        },
        streetAddress: {
            type: String,
            required: [true, "Please provide the street address"]
        }
    },
    MapLocation: {
        type: String,
        required: [true, "Please provide the map location URL"]
    },
    isSundayOff:{
        type: Boolean,
        default:true,
    }

}, { timestamps: true });

module.exports = mongoose.model('Clinic', ClinicSchema);
