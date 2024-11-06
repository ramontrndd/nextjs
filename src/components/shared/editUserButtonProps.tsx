
import React, { useState } from 'react';
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RegisterForm from '@/components/auth/registerForm';
import { UserInterface } from '@/interfaces/user';

interface EditUserButtonProps {
  user: UserInterface;
  onSave: (user: UserInterface) => void;
}

const EditUserButton: React.FC<EditUserButtonProps> = ({ user, onSave }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (updatedUser: UserInterface) => {
    onSave(updatedUser);
    handleClose();
  };

  return (
    <>
      <IconButton size="small" color="primary" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar Usuário</DialogTitle>
        <DialogContent>
          <RegisterForm user={user} onSave={handleSave} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditUserButton;