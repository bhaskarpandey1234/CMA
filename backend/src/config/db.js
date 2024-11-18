// connectDB.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables

const connectDB = async () => {
  try {
    console.log('Mongo URI:', process.env.MONGO_URI); // Debugging line

    if (!process.env.MONGO_URI) {
      throw new Error('MongoDB URI not provided in environment variables');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;



// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection failed:', error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
