import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Verifica se o usuário existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
      }

      // Verifica se a senha está correta
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
      }

      // Verifica se o status do usuário é verdadeiro
      if (!user.status) {  // Aqui é onde verificamos o status como um booleano
        return res.status(403).json({ success: false, message: 'Acesso negado: sua conta está pendente de aprovação.' });
      }

      // Gera o token JWT
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Retorna o token junto com os dados do usuário
      res.status(200).json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ success: false, message: `Método ${req.method} não permitido` });
  }
}
