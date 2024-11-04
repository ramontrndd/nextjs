import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, insira um nome.'],
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
    minlength: [6, 'A senha deve ter pelo menos 6 caracteres.'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, { collection: 'nextapp' });  // Aqui você especifica a coleção

export default mongoose.models.User || mongoose.model('User', UserSchema);
