import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { UserInterface } from '@/interfaces/user';
import connectDB from '@/lib/db';
import User from '@/models/UserModel';

interface AuthenticatedRequest extends NextApiRequest {
  user?: UserInterface;
}

const auth = async (req: AuthenticatedRequest, res: NextApiResponse, next: () => void) => {
  await connectDB();

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Acesso negado. Cabeçalho de autorização não encontrado.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    req.user = user;
    next(); // Token válido, chama o próximo middleware ou handler
  } catch (err) {
    console.error("Erro ao verificar o token:", (err as Error).message);  // Log de erro
    return res.status(401).json({ success: false, message: 'Token inválido.', error: (err as Error).message });
  }
};

export default auth;