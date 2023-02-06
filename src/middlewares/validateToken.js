const validateToken = (req, res, next) => {
  const token = req.header('authorization');
  console.log(token.length);

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  } 
  if (typeof token !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  return next();
};

module.exports = validateToken;