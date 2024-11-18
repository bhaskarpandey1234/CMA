const express = require('express');
const { createCar, getCars, getCar, updateCar, deleteCar, searchCars } = require('../controllers/carController');
const authMiddleware = require('../middlewares/authMiddleware');
// const upload = require('../utils/fileUpload');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const carController = require('../controllers/carController');



const router = express.Router();

router.post('/', authMiddleware, uploadMiddleware.array('images', 10), carController.createCar);


router.use(authMiddleware);
// router.post('/', uploadMiddleware.array('images', 10), createCar);
router.get('/', getCars);
router.get('/search', searchCars);
router.get('/:id', getCar);
router.put('/:id', uploadMiddleware.array('images', 10), updateCar);
router.delete('/:id', deleteCar);

module.exports = router;
