import {  NextApiResponse } from 'next';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import User from '@/models/UserModel';
import { AuthenticatedRequest, auth } from '@/middleware/auth';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method === 'PATCH') {
    const { userId, status } = req.body;

    try {
      // Verifica se o userId é um ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: 'ID de usuário inválido.' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
      }

      // Atualiza o campo status do usuário
      user.status = status;

      // Salva as alterações no banco de dados
      await user.save();

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.setHeader('Content-Type', 'application/json');
    res.status(405).json({ success: false, message: `Método ${req.method} não permitido` });
  }
};

const withAuth = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    await auth(req, res, () => handler(req, res));
  };
};

export default withAuth(handler);