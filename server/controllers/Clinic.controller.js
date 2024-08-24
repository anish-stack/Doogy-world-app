const Clinic = require('../models/Clinic.model')
const doctors = require('../models/Doctors.models');
const Service = require('../models/Services.model'); // Corrected import
const CatchAsync = require('../middlewares/CatchAsync');
const ApiResponse = require('../utils/ApiResponse');
const UploadImage = require('../middlewares/CloudinaryUpload');


//exports Create New Clinic 

exports.CreateNewClinic = CatchAsync(async (req, res) => {
    try {
        const Lab_images = req.files;
        const {
            Ratings,
            OpensAndCloseTime,
            ContactNumber,
            Doctors,
            Services,
            longitude,
            latitude,
            OfficeNo,
            Landmark,
            streetAddress,
            MapLocation,
            isSundayOff
        } = req.body;

        let missingFields = [];

        if (!Ratings) missingFields.push("Ratings");
        if (!OpensAndCloseTime) missingFields.push("Open And Close Time");
        if (!ContactNumber) missingFields.push("Contact Number");
        if (!Doctors || Doctors.length === 0) missingFields.push("Doctors");
        if (!Services || Services.length === 0) missingFields.push("Services");
        if (!longitude) missingFields.push("Longitude");
        if (!latitude) missingFields.push("Latitude");
        if (!OfficeNo) missingFields.push("Office No");
        if (!Landmark) missingFields.push("Landmark");
        if (!streetAddress) missingFields.push("Street Address");
        if (!MapLocation) missingFields.push("Map Location");
        if (isSundayOff === undefined) missingFields.push("Sunday Off");

        if (missingFields.length > 0) {
            return res.status(400).json({
                status: "false",
                message: "Missing required fields",
                missingFields
            });
        }

        // Check if Doctors' IDs are available
        for (let index = 0; index < Doctors.length; index++) {
            const element = Doctors[index];
            const DoctorCheck = await doctors.findById(element.id); // Corrected `Doctor.findById` for checking existence
            if (!DoctorCheck) {
                return res.status(400).json({
                    status: "false",
                    message: `Doctor with ID ${element.id} not found`
                });
            }
        }

        // Check if Services' IDs are available
        for (let index = 0; index < Services.length; index++) {
            const element = Services[index]; // Corrected the variable reference to `Services`
            const ServiceCheck = await Service.findById(element.id); // Corrected `Service.findById` for checking existence
            if (!ServiceCheck) {
                return res.status(400).json({
                    status: "false",
                    message: `Service with ID ${element.id} not found`
                });
            }
        }

        // Upload images to Cloudinary
        const imageUploadPromises = Lab_images.map(file => UploadImage(file));
        const imageResults = await Promise.all(imageUploadPromises);

        // Save clinic information to database
        const newClinic = await Clinic.create({
            Ratings,
            OpensAndCloseTime,
            ContactNumber,
            Doctors,
            Services,
            longitude,
            latitude,
            OfficeNo,
            Landmark,
            streetAddress,
            MapLocation,
            isSundayOff,
            Images: imageResults.map(result => ({
                url: result?.ImageUrl,
                PublicId: result?.PublicId
            }))
        });

        res.status(201).json({
            status: "success",
            message: "Clinic created successfully",
            data: newClinic
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An error occurred while creating the clinic",
            error: error.message
        });
    }
});
