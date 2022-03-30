const jswtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header.authorization.split(' ')[1];
    const decodeur = jswtoken.verify(token, "TOKEN_JSON_RANDOME");
    const userId = decodeur.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable ! ';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    })
  }
};