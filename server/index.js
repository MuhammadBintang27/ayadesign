const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRouter = require('./routes/authRoute');
const orderRoute = require('./routes/orderRoute');
const { MONGO_URI } = require("./utils/constant");
mongoose.set('strictQuery', true);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/uploads', express.static(path.join(__dirname, '../../client/public/uploads'))); // Serving static files
app.use('/api', orderRoute);



// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Global error handler
app.use((err, req, res, next) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
