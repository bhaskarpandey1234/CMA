const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Get the token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ensure that the decoded token contains userId
    if (!decoded.userId) {
      return res.status(401).json({ message: 'Invalid token, userId missing' });
    }
    
    // Attach user info to request for further use
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;



// const jwt = require('jsonwebtoken');
// const User = require('../models/User');


// const authMiddleware = (req, res, next) => {
// //   const token = req.header('Authorization');
// // const token = req.headers.authorization?.split(' ')[1];
// const token = req.header('Authorization')?.split(' ')[1];

//   if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded.userId) {
//         return res.status(401).json({ message: 'Invalid token, userId missing' });
//       }
//     req.user = decoded;
//     // req.user =  User.findById(decoded.userId);

//     if (!req.user) {
//         return res.status(401).json({ message: 'User not found' });
//       }

//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// module.exports = authMiddleware;
