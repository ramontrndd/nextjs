import {  NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import User from '@/models/UserModel';
import { AuthenticatedRequest, auth } from '@/middleware/auth';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const users = await User.find().select('-password');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
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