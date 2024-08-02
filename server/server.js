const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const CookiesParser = require('cookie-parser');
const connectDb = require('./config/db');
const { sendMessage } = require('./utils/SendSms');
const ApiRouter = require('./routes/Auth.routes');
const ProductsRouter = require('./routes/Products.routes');


const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(CookiesParser());

//Database
connectDb()

// Routes
app.get('/', (req, res) => {
    res.send('Hello From Dogy World 🐶🐶');
});


// Dynamic Routes For User
app.use('/api/v1/auth', ApiRouter)
app.use('/api/v1/Product', ProductsRouter)


// Handle unhandled error rejections
process.on('unhandledRejection', (err, promise) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

// Listen app
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
