import {  NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import User from '@/models/UserModel';
import { AuthenticatedRequest, auth } from '@/middleware/auth';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method === 'PATCH') {
    const { name, email, contactNumber, role, status } = req.body;

    try {
      const user = req.user;
      if (!user) {
        return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
      }

      // Atualiza os campos do usuário
      if (name) user.name = name;
      if (email) user.email = email;
      if (contactNumber) user.contactNumber = contactNumber;
      if (role) user.role = role;

      // Alterna o campo status se toggleStatus for true
      if (status) {
        user.status = !user.status;
      }

      // Salva as alterações no banco de dados
      await User.findByIdAndUpdate(user.id, user, { new: true });

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