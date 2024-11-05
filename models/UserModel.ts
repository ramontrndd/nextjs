import mongoose, { Schema } from 'mongoose';
import { IUser } from './../interfaces/User';

const UserSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Por favor, insira um nome.'],
    match: [
      /^[a-zA-Z\s]+$/,
      'O nome deve conter apenas letras e espaços.',
    ],
  },
  email: {
    type: String,
    required: [true, 'Por favor, insira um e-mail.'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor, insira um e-mail válido.',
    ],
  },
  telefone: {
    type: String,
    required: [true, 'Por favor, insira um telefone.'],
    match: [
      /^\+?[1-9]\d{1,14}$/,
      'Por favor, insira um número de telefone válido.',
    ],
  },
  status: {
    type: Boolean,
    default: true, // Assume que o usuário está ativo por padrão
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, { collection: 'nextapp' });  // Aqui você especifica a coleção

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);