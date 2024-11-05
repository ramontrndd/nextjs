import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Acesso negado. Cabeçalho de autorização não encontrado.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next(); // Token válido, chama o próximo middleware ou handler
  } catch (err) {
    console.error("Erro ao verificar o token:", err.message);  // Log de erro
    return res.status(401).json({ success: false, message: 'Token inválido.', error: err.message });
  }
};
