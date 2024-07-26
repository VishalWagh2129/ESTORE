import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    if (!token) {
      return res.status(401).send({ message: 'Authorization token missing!' });
    }
    jwt.verify(token, 'estore-secret-key');
    next();
  } catch (error) {
    res.status(401).send({ message: 'Authorization failed!' });
  }
};
