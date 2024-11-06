export interface UserInterface {
    _id?: string;
    name: string;
    password: string;
    email: string;
    contactNumber: number;
    status: boolean;
    role: 'user' | 'admin';
  }
