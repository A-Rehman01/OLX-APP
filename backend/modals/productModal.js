const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  Category: {
    type: String,
    required: true,
  },

  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  City: {
    type: String,
    required: true,
  },
  Province: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  Detail: {
    Make: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    Condition: {
      type: String,
      required: false,
    },
  },
  discription: {
    type: String,
    required: false,
  },
  images: {
    imgfrontside: {
      type: String,
      required: true,
    },
    imgleftside: {
      type: String,
      required: true,
    },
    imgrightside: {
      type: String,
      required: true,
    },
    imgbackside: {
      type: String,
      required: true,
    },
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
