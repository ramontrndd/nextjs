/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Typography, Box, Snackbar, Alert, Container, Paper } from '@mui/material';
import axios from 'axios';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { ApiResponse } from '@/interfaces/apiResponse';
import { UserInterface } from '@/interfaces/user';
import Cookies from 'js-cookie';

const roles = [
  { value: 'user', label: 'Usuário' },
  { value: 'admin', label: 'Administrador' },
];

interface EditUserFormProps {
  user: UserInterface;
  onSave: (updatedUser: UserInterface) => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [contactNumber, setContactNumber] = useState(user.contactNumber);
  const [role, setRole] = useState<'user' | 'admin'>(user.role);
  const [status, setStatus] = useState(user.status);

  // Estados de erro e mensagens de ajuda
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');

  // Estado do Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Estado de carregamento
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado de validação do formulário
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      name !== '' &&
      email !== '' &&
      contactNumber !== '' &&
      !nameError &&
      !emailError &&
      !contactNumberError
    );
  }, [name, email, contactNumber, nameError, emailError, contactNumberError]);

  const handleBlur = (field: string) => {
    switch (field) {
      case 'name':
        if (name === '') {
          setNameError('Nome é obrigatório.');
        } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) {
          setNameError('O nome deve conter apenas letras e espaços.');
        } else {
          setNameError('');
        }
        break;
      case 'email':
        if (email === '') {
          setEmailError('Email é obrigatório.');
        } else if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
          setEmailError('Por favor, insira um e-mail válido.');
        } else {
          setEmailError('');
        }
        break;
      case 'contactNumber':
        if (contactNumber === '') {
          setContactNumberError('Telefone é obrigatório.');
        } else if (!/^\d{11}$/.test(contactNumber)) {
          setContactNumberError('Por favor, insira um número de telefone válido com 11 dígitos.');
        } else {
          setContactNumberError('');
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Reseta os erros
    handleBlur('name');
    handleBlur('email');
    handleBlur('contactNumber');

    if (nameError || emailError || contactNumberError) {
      return;
    }

    const updatedUser: UserInterface = { ...user, name, email, contactNumber, role, status };

    setIsSubmitting(true);

    try {
      const token = Cookies.get('token');
      const response = await axios.patch<ApiResponse<UserInterface>>('/api/users/updateUser', { userId: user._id, ...updatedUser }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        // Exibir mensagem de sucesso
        setSnackbarMessage('Usuário atualizado com sucesso!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        onSave(response.data.data);
      } else {
        setSnackbarMessage(response.data.message || 'Erro ao atualizar usuário.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorMessage = (error: any): string => {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    } else if (error.message) {
      return error.message;
    }
    return 'Erro ao atualizar usuário.';
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
 
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <AccountCircleRoundedIcon sx={{ fontSize: 50, color: 'primary.main' }} />
          <Typography variant="h4" gutterBottom className='font-bold text-customBlue'>
            EDITAR USUÁRIO
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            error={!!nameError}
            label="Nome"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur('name')}
            required
            helperText={nameError}
            placeholder="Digite seu nome completo"
            inputProps={{ pattern: "^[a-zA-ZÀ-ÿ\\s]+$" }}
          />
          <TextField
            error={!!emailError}
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            required
            helperText={emailError}
            placeholder="Digite seu email (ex: exemplo@dominio.com)"
            inputProps={{ pattern: "^[\\w.%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$" }}
          />
          <TextField
            error={!!contactNumberError}
            label="Telefone"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            onBlur={() => handleBlur('contactNumber')}
            required
            helperText={contactNumberError}
            placeholder="Digite seu telefone (11 dígitos)"
            inputProps={{ pattern: "^\\d{11}$" }}
          />
          <TextField
            select
            label="Perfil"
            value={role}
            onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" color="primary" type="submit" fullWidth disabled={!isFormValid || isSubmitting} sx={{ mt: 2 }}>
            {isSubmitting ? 'Atualizando...' : 'Atualizar'}
          </Button>
        </form>
     
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </>
  );
};

export default EditUserForm;