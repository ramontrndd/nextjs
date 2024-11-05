import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { name, email, password, role } = req.body;

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
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    // Se o método não for POST, retornamos o erro 405
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ success: false, message: `Método ${req.method} não permitido` });
  }
}
