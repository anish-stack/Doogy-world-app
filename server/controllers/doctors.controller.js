const doctors = require('../models/Doctors.models');
const CatchAsync = require('../middlewares/CatchAsync');
const ApiResponse = require('../utils/ApiResponse');
const { uploadImage } = require('../middlewares/CloudinaryUpload');


// Create Doctor
exports.CreateDoctor = CatchAsync(async (req, res) => {
    const ProfilePic = req.files;

    if (!ProfilePic || ProfilePic.length === 0) {
        return ApiResponse.error(res, "Please upload at least one image", 400);
    }

    const { Specialty, Experience, Gender, Name, Degree, ContactNumber, Email } = req.body;

    const missingFields = [];
    if (!Specialty) missingFields.push("Specialty");
    if (!Experience) missingFields.push("Experience");
    if (!Name) missingFields.push("Name");
    if (!Degree) missingFields.push("Degree");
    if (!ContactNumber) missingFields.push("ContactNumber");
    if (!Email) missingFields.push("Email");
    if (!Gender) missingFields.push("Gender");

    if (missingFields.length > 0) {
        return ApiResponse.error(res, `Missing fields: ${missingFields.join(", ")}`, 400);
    }

    try {
        const imageUploadPromises = ProfilePic.map(file => uploadImage(file));
        const imageResults = await Promise.all(imageUploadPromises);

        let imageUrl = '';
        let imagePublicId = '';

        if (imageResults.length > 0 && imageResults[0].ImageUrl && imageResults[0].PublicId) {
            imageUrl = imageResults[0].ImageUrl;
            imagePublicId = imageResults[0].PublicId;
        } else {
            imageUrl = Gender === 'male' ? "https://i.ibb.co/VHKHCrD/doctor-men.png" : "https://i.ibb.co/Y23gtV7/doctor-women.png";
            imagePublicId = 'Error While Uploading Image No Public id'; // No public ID for default image
        }

        // Create a new doctor record
        const newDoctor = new doctors({
            Specialty,
            Experience,
            Name,
            Degree,
            ContactNumber,
            Email,
            Gender,
            Image: {
                url: imageUrl,
                PublicId: imagePublicId
            }
        });

        // Save the new doctor record to the database
        const savedDoctor = await newDoctor.save();

        // Return a success response
        return ApiResponse.success(res, savedDoctor, 201);
    } catch (error) {
        console.error(error);
        return ApiResponse.error(res, "Internal server error", 500);
    }
});



// Update Doctor
exports.UpdateDoctor = CatchAsync(async (req, res) => {
    const { id } = req.params;
    const { Specialty, Gender, Experience, Name, Degree, ContactNumber, Email } = req.body;
    console.log(req.body)
    const updatedFields = {
        Specialty,
        Experience,
        Name,
        Gender,
        Degree,
        ContactNumber,
        Email
    };
    console.log(updatedFields)
    try {
        // Update doctor record
        const updatedDoctor = await doctors.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!updatedDoctor) {
            return ApiResponse.error(res, "Doctor not found", 404);
        }

        // Return a success response
        return ApiResponse.success(res, updatedDoctor, 200);
    } catch (error) {
        console.error(error);
        return ApiResponse.error(res, "Internal server error", 500);
    }
});


// Get Doctor
exports.GetDoctor = CatchAsync(async (req, res) => {


    try {
        const doctor = await doctors.find();

        if (doctor.length === 0) {
            return ApiResponse.error(res, "Doctor not found", 404);
        }

        // Return a success response
        return ApiResponse.success(res, doctor, 200);
    } catch (error) {
        console.error(error);
        return ApiResponse.error(res, "Internal server error", 500);
    }
});
// Get Doctor
exports.GetSingleDoctor = CatchAsync(async (req, res) => {
    const { id } = req.params;

    try {
        const doctor = await doctors.findById(id);

        if (!doctor) {
            return ApiResponse.error(res, "Doctor not found", 404);
        }

        // Return a success response
        return ApiResponse.success(res, doctor, 200);
    } catch (error) {
        console.error(error);
        return ApiResponse.error(res, "Internal server error", 500);
    }
});

// Delete Doctor
exports.DeleteDoctor = CatchAsync(async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDoctor = await doctors.findByIdAndDelete(id);

        if (!deletedDoctor) {
            return ApiResponse.error(res, "Doctor not found", 404);
        }

        // Return a success response
        return ApiResponse.success(res, "Doctor deleted successfully", 200);
    } catch (error) {
        console.error(error);
        return ApiResponse.error(res, "Internal server error", 500);
    }
});


//ToggleDoctor Available Status
exports.ToggleDoctorStatus = CatchAsync(async (req, res) => {
    const { id } = req.params;

    try {
        const doctor = await doctors.findById(id);

        if (!doctor) {
            return ApiResponse.error(res, "Doctor not found", 404);
        }

        // Toggle the availability status
        doctor.isDoctorAvailable = !doctor.isDoctorAvailable;
        const updatedDoctor = await doctor.save();

        // Return a success response
        return ApiResponse.success(res, updatedDoctor, 200);
    } catch (error) {
        console.error(error);
        return ApiResponse.error(res, "Internal server error", 500);
    }
});



