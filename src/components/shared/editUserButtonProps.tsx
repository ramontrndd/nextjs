import React, { useState } from 'react';
import { IconButton, Dialog,  DialogContent, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { UserInterface } from '@/interfaces/user';
import EditUserForm from '@/components/auth/editForm';

interface EditUserButtonProps {
  user: UserInterface;
  onSave: (updatedUser: UserInterface) => void;
}

const EditUserButton: React.FC<EditUserButtonProps> = ({ user, onSave }) => {
  const [open, setOpen] = useState(false);

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
      <IconButton onClick={handleClickOpen} color="primary">
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      
        <DialogContent>
          <EditUserForm user={user} onSave={handleSave} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditUserButton;