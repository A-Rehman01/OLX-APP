const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../modals/userModal.js');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  //   console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not Authorized ,token not valid');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized ,token not found');
  }
});

module.exports = protect;
