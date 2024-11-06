/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/dashboard/deleteUserButton.tsx
import React, { useState } from 'react';
import { IconButton, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ApiResponse } from '@/interfaces/apiResponse';

interface DeleteUserButtonProps {
  userId: string;
  onDelete: (userId: string) => void;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ userId, onDelete }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      const response = await axios.delete<ApiResponse<null>>('/api/users/deleteUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { userId },
      });

      if (response.data.success) {
        onDelete(userId);
        handleClose();
      } else {
        console.error(response.data.message || 'Falha ao deletar usuário');
      }
    } catch (error: any) {
      console.error(error.response?.data?.message || 'Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton size="small" color="error" onClick={handleClickOpen} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : <DeleteIcon />}
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar Exclusão"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza de que deseja excluir este usuário? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={deleteUser} color="error" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteUserButton;