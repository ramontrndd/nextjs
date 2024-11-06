
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserInterface } from '@/interfaces/user';
import UserList from '@/components/dashboard/userList';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get<{ success: boolean; data: UserInterface[] }>('/api/users/getAllUsers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  return <UserList users={users} />;
};

export default UsersPage;