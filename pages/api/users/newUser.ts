import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import User from '@/models/UserModel';

import bcrypt from 'bcryptjs';
import { UserInterface } from '@/interfaces/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'POST') {
    const { name, email, password, role, contactNumber }: UserInterface = req.body;

    try {
      // Verificando se já existe um usuário com o e-mail informado
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Usuário já existe.' });
      }

      // Criptografando a senha do usuário
      const hashedPassword = await bcrypt.hash(password, 10);

      // Definindo o status baseado no role
      const status = role === 'admin' ? false : true;  // 'admin' recebe false (pendente), 'user' recebe true (ativo)

      // Criando o novo usuário com os dados recebidos
      const user = new User({
        name,
        email,
        contactNumber,
        password: hashedPassword,
        role,
        status,  // status agora é atribuído de acordo com o role
      });

      // Salvando o usuário no banco de dados
      await user.save();

      // Respondendo com sucesso
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      // Tratamento de erro caso algo aconteça
      res.status(400).json({ success: false, error: (error as Error).message });
    }
  } else {
    // Se o método não for POST, retornamos o erro 405
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ success: false, message: `Método ${req.method} não permitido` });
  }
}