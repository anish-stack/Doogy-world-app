const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const CookiesParser = require('cookie-parser');
const connectDb = require('./config/db');
const ApiRouter = require('./routes/Auth.routes');
const ProductsRouter = require('./routes/Products.routes');
const DoctorRouter = require('./routes/Doctor.routes');

const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(CookiesParser());

// Database
connectDb();

// Routes
app.get('/', (req, res) => {
    res.send('Hello From Dogy World 🐶🐶');
});

// Dynamic Routes For User
app.use('/api/v1/auth', ApiRouter);
app.use('/api/v1/Product', ProductsRouter);
app.use('/api/v1/Doctors', DoctorRouter);

// Start server and store the server instance
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle unhandled error rejections
process.on('unhandledRejection', (err, promise) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    // Close the server and exit process
    server.close(() => process.exit(1));
});
