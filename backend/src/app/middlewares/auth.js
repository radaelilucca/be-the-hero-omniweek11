export default async (req, res, next) => {
  const authId = req.headers.authorization;

  console.log(authId);

  if (!authId) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  req.ongId = authId;

  return next();
};
