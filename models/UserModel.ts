import mongoose, { Schema } from 'mongoose';
import { UserInterface } from '@/interfaces/user';

const UserSchema: Schema = new Schema<UserInterface>({
  name: {
    type: String,
    required: [true, 'Por favor, insira um nome.'],
    match: [
      /^[a-zA-ZÀ-ÿ\s]+$/,
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
  password: {
    type: String,
    required: [true, 'Por favor, insira uma senha.'],
    minlength: [5, 'A senha deve ter pelo menos 5 caracteres.'],
    match: [
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;'"<>,.?/~`-])[A-Za-z\d!@#$%^&*()_+={}[\]:;'"<>,.?/~`-]{5,}$/,
      'A senha deve conter pelo menos 5 caracteres, incluindo letras, números e caracteres especiais.',
    ],
  },
  contactNumber: {
    type: Number,
    required: [true, 'Por favor, insira um telefone.'],
    match: [
      /^\d{11}$/,
      'Por favor, insira um número de telefone válido com 11 dígitos.',
    ],
  },
  status: {
    type: Boolean,
    default: true, 
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, { collection: 'nextapp' });

export default mongoose.models.User || mongoose.model<UserInterface>('User', UserSchema);