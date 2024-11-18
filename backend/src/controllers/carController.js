const Car = require('../models/Car');

exports.createCar = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Please upload at least one image.' });
    }

    const { title, description, tags } = req.body;
    if (!title || !description || !tags) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const images = req.files.map(file => file.path);
    const car = await Car.create({
      userId: req.user.userId,
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()),
      images,
    });

    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCars = async (req, res) => {
    try {
      console.log("User Info from Middleware:", req.user); // Log user data
      const cars = await Car.find({ userId: req.user.userId });
      console.log("Cars Found:", cars); // Log the result of the query
      res.json(cars);
    } catch (error) {
      console.error("Error in getCars:", error.message);
      res.status(500).json({ message: error.message });
    }
  };
  
// exports.getCars = async (req, res) => {
//   try {
//     const cars = await Car.find({ userId: req.user.id });
//     res.json(cars);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.userId.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const images = req.files ? req.files.map(file => file.path) : undefined;
    const car = await Car.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { title, description, tags, ...(images && { images }) },
      { new: true }
    );
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchCars = async (req, res) => {
  try {
    const { keyword } = req.query;
    const cars = await Car.find({ $text: { $search: keyword }, userId: req.user.userId });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
