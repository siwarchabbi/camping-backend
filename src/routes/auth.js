const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

/* Register */
router.post(
  '/register',
  [
    check('name', 'Name is required').notEmpty(),

    check('email', 'Please include a valid email').isEmail(),

    check('phone', 'Phone number is required').notEmpty(),

    check('password', 'Password must be at least 6 characters')
      .isLength({ min: 6 }),

    check('role')
      .optional()
      .isIn(['CIVIL', 'BENEVOLE', 'PROTECTION'])
      .withMessage('Invalid role')
  ],
  authController.register
);

/* Login */
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.login
);

/* Example: get current user (protected) */
router.get('/me', authMiddleware, async (req, res) => {
  // req.user set by authMiddleware
  const User = require('../models/User');
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // ✅ remove password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
