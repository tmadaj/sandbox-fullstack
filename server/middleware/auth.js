const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
  } catch (err) {
    return res.status(401).send('Invalid Authorization Token');
  }

  next();
}

module.exports = auth;
