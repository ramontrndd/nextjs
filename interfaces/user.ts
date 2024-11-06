export interface UserInterface {
    id?: string;
    name: string;
    password: string;
    email: string;
    contactNumber: number;
    status: boolean;
    role: 'user' | 'admin';
  }