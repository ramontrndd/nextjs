import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import {auth} from '../../../middleware/auth';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    // Usa o middleware de autenticação
    auth(req, res, async () => {
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(401).json({ success: false, message: error.message });
      }
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ success: false, message: `Método ${req.method} não permitido` });
  }
}
