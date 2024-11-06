export interface UserInterface {
    _id?: string;
    name: string;
    password: string;
    email: string;
    contactNumber: string;
    status: boolean;
    role: 'user' | 'admin';
  }
