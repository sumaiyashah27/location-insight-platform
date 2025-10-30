import jwt from 'jsonwebtoken';

export const contextFactory = ({ req }) => {
  const jwtSecret = process.env.JWT_SECRET || 'dev_secret_change_me';
  const auth = req.headers.authorization || '';
  let user = null;
  if (auth.startsWith('Bearer ')) {
    const token = auth.substring(7);
    try {
      const decoded = jwt.verify(token, jwtSecret);
      user = { id: decoded.sub, role: decoded.role, email: decoded.email, name: decoded.name || decoded.email };
    } catch (e) {
      // invalid/expired token -> user stays null
    }
  }
  return { user, jwtSecret };
};
