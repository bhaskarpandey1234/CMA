const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // assuming the file is in config folder
const path = require('path');

dotenv.config();
const app = express();

const cors = require('cors'); // Import cors

// dotenv.config();

// const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://melodious-croquembouche-341ea2.netlify.app'],
}));

// const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

app.use(express.json());

// Other route imports
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');

// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.resolve(__dirname, './uploads')));


app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// require('dotenv').config();

// const express = require('express');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const carRoutes = require('./routes/carRoutes');

// const app = express();

// connectDB();

// app.use(express.json());
// app.use('/api/auth', authRoutes);
// app.use('/api/cars', carRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
