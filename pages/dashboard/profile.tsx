
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserInterface } from '@/interfaces/user';
import UserProfile from '@/components/dashboard/userProfile';

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserInterface | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get<{ success: boolean; data: UserInterface }>('/api/users/getProfile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar perfil do usuário:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return userProfile ? <UserProfile userProfile={userProfile} /> : <div>Carregando...</div>;
};

export default ProfilePage;