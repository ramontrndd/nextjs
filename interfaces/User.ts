export interface IUser {
    id?: string;
    name: string;
    email: string;
    telefone: string;
    status: boolean;
    role: 'user' | 'admin';
  }