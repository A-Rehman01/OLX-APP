const express = require('express');
const protect = require('../middlewares/authMiddleware');
const {
  createProduct,
  getProductById,
  getProducts,
  getCategory,
  deleteProduct,
  getMyProducts,
} = require('../controller/productController');

const router = express.Router();

router.route('/category').get(getCategory);
router.route('/myproducts').get(protect, getMyProducts);

router.route('/').get(getProducts).post(protect, createProduct);
router.route('/:id').get(getProductById).delete(protect, deleteProduct);
router.route('/').get(protect, getMyProducts);
module.exports = router;
