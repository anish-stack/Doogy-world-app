const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CreateDoctor, GetDoctor, GetSingleDoctor, DeleteDoctor, UpdateDoctor, ToggleDoctorStatus } = require('../controllers/doctors.controller');
const storage = multer.memoryStorage();
const upload = multer({ storage });


//====================Doctors Routes ====================
router.post('/Create-Doctor', upload.array('images'), CreateDoctor);
router.get('/Get-Doctor', GetDoctor);
router.get('/Get-Doctor-By/:id', GetSingleDoctor);
router.delete('/Delete-Doctor/:id', DeleteDoctor);
router.put('/Update-Doctor/:id', UpdateDoctor);
router.put('/Toggle-Doctor-status/:id', ToggleDoctorStatus);







module.exports = router;
