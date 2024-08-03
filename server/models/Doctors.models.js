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
    Degree: {
        type: String,
        required: [true, "Please provide the doctor's Degree"]
    },
    Specialty: {
        type: String,
        required: [true, "Please provide the doctor's Specialty"]
    },
    Experience: {
        type: String,
        required: [true, "Please provide the doctor's experience in years"]
    },
    Name: {
        type: String,
        required: [true, "Please provide the doctor's name"]
    },
    ContactNumber: {
        type: Number,
        required: [true, "Please provide the doctor's Number"]
    },
    Email: {
        type: String,
        required: [true, "Please provide the doctor's Email"]
    },
    HowManyAppointmentsDone: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "appointment"
        }
    ],
    Gender:{
        type:String,
        enum:["male","female","Others"]
    },
    isDoctorAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);
