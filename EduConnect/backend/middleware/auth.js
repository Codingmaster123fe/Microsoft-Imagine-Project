const jwt = require('jsonwebtoken');

/**
 * Verify JWT token from request headers
 */
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Check if user is a student
 */
const isStudent = (req, res, next) => {
  if (req.user?.userType !== 'student') {
    return res.status(403).json({ error: 'Student access required' });
  }
  next();
};

/**
 * Check if user is a mentor
 */
const isMentor = (req, res, next) => {
  if (req.user?.userType !== 'mentor') {
    return res.status(403).json({ error: 'Mentor access required' });
  }
  next();
};

module.exports = { verifyToken, isStudent, isMentor };
