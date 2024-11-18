// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const user = await User.create({ name, email, password });
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// User Signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Hash the password before saving it to the DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Create a JWT token and send it in the response
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
