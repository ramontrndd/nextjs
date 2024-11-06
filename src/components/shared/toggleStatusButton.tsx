/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { IconButton, CircularProgress } from '@mui/material';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ApiResponse } from '@/interfaces/apiResponse';
import { UserInterface } from '@/interfaces/user';

interface ToggleStatusButtonProps {
  userId: string;
  currentStatus: boolean;
  onStatusChange: (userId: string, newStatus: boolean) => void;
}

const ToggleStatusButton: React.FC<ToggleStatusButtonProps> = ({ userId, currentStatus, onStatusChange }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const toggleUserStatus = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      const response = await axios.patch<ApiResponse<UserInterface>>(`/api/users/updateUserStatus`, { userId, status: !currentStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        onStatusChange(userId, !currentStatus);
      } else {
        console.error(response.data.message || 'Falha ao atualizar status do usuário');
      }
    } catch (error: any) {
      console.error(error.response?.data?.message || 'Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton size="small" color="default" onClick={toggleUserStatus} disabled={loading}>
      {loading ? <CircularProgress size={24} /> : currentStatus ? <ToggleOnIcon fontSize="small" /> : <ToggleOffIcon fontSize="small" />}
    </IconButton>
  );
};

export default ToggleStatusButton;