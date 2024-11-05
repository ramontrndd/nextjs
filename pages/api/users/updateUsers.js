import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { auth } from '../../../middleware/auth';
import mongoose from 'mongoose';

export default async function handler(req, res) {
    await dbConnect();

    // Verifica se o método HTTP é PATCH
    if (req.method === 'PATCH') {
        const { id } = req.query; // Acessando o ID da query

        try {
            // Middleware de autenticação
            await new Promise((resolve, reject) => {
                auth(req, res, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            });

            // Verifica se o ID é um ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ success: false, message: 'ID inválido' });
            }

            const { name, email, role } = req.body;

            // Atualiza parcialmente o usuário pelo ID
            const user = await User.findByIdAndUpdate(
                id,
                { ...(name && { name }), ...(email && { email }), ...(role && { role }) },
                { new: true, runValidators: true }
            );

            if (!user) {
                return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
            }

            res.status(200).json({ success: true, data: user });
        } catch (error) {
            console.error('Erro no servidor:', error);
            res.status(500).json({ success: false, message: 'Erro interno do servidor' });
        }
    } else {
        res.setHeader('Allow', ['PATCH']);
        res.status(405).json({ success: false, message: `Método ${req.method} não permitido` });
    }
}
