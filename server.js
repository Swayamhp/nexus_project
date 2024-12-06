require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Initialize Express App
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Built-in express JSON parser

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store the file in 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add unique timestamp to filename
  }
});

const upload = multer({ storage: storage });

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Job Application Schema
const JobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  resume: {
    type: String, // Store resume as file path (URL in production)
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Job Application - Submit (POST request to this route with file upload)
app.post('/apply-job', upload.single('resume'), async (req, res) => {
  const { name, email, phone, experience, position } = req.body;
  const resumePath = req.file ? req.file.path : null; // Get file path of uploaded resume

  if (!resumePath) {
    return res.status(400).json({ message: 'Resume file is required.' });
  }

  try {
    const newApplication = new JobApplication({
      name,
      email,
      phone,
      experience,
      position,
      resume: resumePath, // Store the file path to the resume
    });

    await newApplication.save(); // Save to MongoDB
    res.status(201).json({
      message: 'Job application submitted successfully!',
      data: newApplication,
    });
  } catch (error) {
    console.error('Error submitting job application:', error);
    res.status(500).json({
      message: 'Error submitting job application',
      error,
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB(); // Connect to MongoDB
});




