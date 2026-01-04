const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// TODO: Replace with actual MongoDB User model when schema is created
const users = {}; // Temporary in-memory storage

/**
 * Register a new user
 * POST /api/auth/register
 */
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('name').trim().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, name, userType } = req.body;

      // Check if user already exists
      if (users[email]) {
        return res.status(409).json({ error: 'Email already registered' });
      }

      // Hash password with salt rounds
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Validate userType
      const validUserTypes = ['student', 'mentor'];
      const finalUserType = validUserTypes.includes(userType) ? userType : 'student';

      // Store user (would be in MongoDB in production)
      users[email] = {
        email,
        password: hashedPassword,
        name,
        userType: finalUserType,
        createdAt: new Date(),
        lastLogin: null,
      };

      // Generate JWT token
      const token = jwt.sign(
        { email, userType: finalUserType, id: Date.now() },
        process.env.JWT_SECRET || 'dev_secret_key',
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { email, name, userType: finalUserType },
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }
);

/**
 * Login user
 * POST /api/auth/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = users[email];
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { email, userType: user.userType },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { email: user.email, name: user.name, userType: user.userType },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get user profile
 * GET /api/auth/profile
 */
router.get('/profile', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    const user = users[decoded.email];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      email: user.email,
      name: user.name,
      userType: user.userType,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
