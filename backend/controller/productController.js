const Product = require('../modals/productModal');
const asyncHandler = require('express-async-handler');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch Single products
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    'user',
    'sellerjoindate name'
  );
  // console.log(product);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

// @desc    GET products Categories
// @route   GET /api/products/category
// @access  Public
const getCategory = asyncHandler(async (req, res) => {
  const product = await Product.find({});
  if (product) {
    const categories = product.map((category) => category.Category);
    let widthOutRepeatedCategory = categories.filter(
      (v, i) => categories.indexOf(v) === i
    );
    res.json(widthOutRepeatedCategory);
  } else {
    res.status(404);
    throw new Error('categories not Found');
  }
});

// @desc    Delete a products
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product Removed Successfully' });
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

// @desc    Fetch my products
// @route   GET /api/products/myproducts
// @access  Private
const getMyProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    'user',
    'sellerjoindate name'
  );
  // console.log(product);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

//@desc Create or Update Product
//@route POST /api/products
//@access private
const createProduct = asyncHandler(async (req, res) => {
  const {
    Category,
    productName,
    productPrice,
    Province,
    City,
    area,
    address,
    Make,
    Condition,
    discription,
    imgfrontside,
    imgleftside,
    imgrightside,
    imgbackside,
    type,
    featured,
  } = req.body;

  //Build Product Object
  const productFields = {};
  productFields.user = req.user.id;
  productFields.Category = Category;

  productFields.productName = productName;
  productFields.productPrice = productPrice;
  productFields.Province = Province;
  productFields.City = City;
  productFields.area = area;
  productFields.address = address;
  if (discription) productFields.discription = discription;
  if (featured) productFields.featured = featured;

  //Build Detail object
  productFields.Detail = {};
  // if we dont do this direct productFields.Detail.type its gives not find error
  if (Make) productFields.Detail.Make = Make;
  if (type) productFields.Detail.type = type;
  if (Condition) productFields.Detail.Condition = Condition;

  //Build images object
  productFields.images = {};
  // if we dont do this direct productFields.images.imgfrontside its gives not find error
  productFields.images.imgfrontside = imgfrontside;
  productFields.images.imgleftside = imgleftside;
  productFields.images.imgrightside = imgrightside;
  productFields.images.imgbackside = imgbackside;
  const product = new Product(productFields);

  if (product) {
    //Create
    await product.save();
    return res.status(201).json({ message: 'Product Created', data: product });
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

module.exports = { getProducts, getProductById, createProduct, getCategory };

// const productFields = {};
//   productFields.user = req.user.id;
//   if (Category) productFields.Category = Category;
//   if (sellername) productFields.sellername = sellername;
//   if (productName) productFields.productName = productName;
//   if (productPrice) productFields.productPrice = productPrice;
//   if (Province) productFields.Province = Province;
//   if (City) productFields.City = City;
//   if (area) productFields.area = area;
//   if (address) productFields.address = address;
//   if (discription) productFields.discription = discription;
//   if (featured) productFields.featured = featured;

//   //Build Detail object
//   productFields.Detail = {};
//   // if we dont do this direct productFields.Detail.type its gives not find error
//   if (Make) productFields.social.Make = Make;
//   if (type) productFields.social.type = type;
//   if (Condition) productFields.social.Condition = Condition;

//   //Build images object
//   productFields.images = {};
//   // if we dont do this direct productFields.images.imgfrontside its gives not find error
//   if (imgfrontside) productFields.images.imgfrontside = imgfrontside;
//   if (imgleftside) productFields.images.imgleftside = imgleftside;
//   if (imgrightside) productFields.images.imgrightside = imgrightside;
//   if (imgbackside) productFields.images.imgbackside = imgbackside;
