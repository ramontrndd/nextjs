import {  NextApiResponse } from 'next';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import User from '@/models/UserModel';
import { AuthenticatedRequest, auth } from '@/middleware/auth';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  await connectDB();

  const { userId } = req.query;

  if (req.method === 'DELETE') {
    try {
      // Verifica se o userId é um ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(userId as string)) {
        return res.status(400).json({ success: false, message: 'ID de usuário inválido.' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
      }

      // Deleta o usuário do banco de dados
      await User.deleteOne({ _id: userId });

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ success: true, message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
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