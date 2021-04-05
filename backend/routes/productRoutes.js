const express = require('express');
const protect = require('../middlewares/authMiddleware');
const {
  createProduct,
  getProductById,
  getProducts,
  getCategory,
} = require('../controller/productController');

const router = express.Router();

router.route('/category').get(getCategory);

router.route('/').get(getProducts).post(protect, createProduct);
router.route('/:id').get(getProductById);
module.exports = router;
