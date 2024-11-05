/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert, MenuItem, Typography, Box } from '@mui/material';
import { AlertColor } from '@mui/material';
import axios from 'axios';

const roles = [
  { value: 'user', label: 'Usuário' },
  { value: 'admin', label: 'Administrador' },
];

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  // Estados de erro e mensagens de ajuda
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Reseta os erros
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);

    // Validação simples
    if (name === '') {
      setNameError(true);
      setSnackbarMessage('O nome é obrigatório.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    if (email === '') {
      setEmailError(true);
      setSnackbarMessage('O email é obrigatório.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    if (password === '') {
      setPasswordError(true);
      setSnackbarMessage('A senha é obrigatória.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const userData = { name, email, password, role };

    try {
      const response = await axios.post('/api/users/createUsers', userData);

      setSnackbarMessage('Cadastro realizado com sucesso!');
      setSnackbarSeverity('success');
      // Limpar os campos após o sucesso
      setName('');
      setEmail('');
      setPassword('');
      setRole('user');
    } catch (error: any) {
      if (error.response && error.response.data) {
        setSnackbarMessage(error.response.data.message || 'Erro ao cadastrar.');
      } else {
        setSnackbarMessage('Erro de rede.');
      }
      setSnackbarSeverity('error');
    }

    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box style={{ maxWidth: 400, margin: 'auto',  }}>
      <Typography variant="h5" gutterBottom align='center'>
        Cadastre uma nova conta
      </Typography>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          error={nameError}
          label="Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          helperText={nameError ? "Nome é obrigatório." : ""}
        />
        <TextField
          error={emailError}
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          helperText={emailError ? "Email é obrigatório." : ""}
        />
        <TextField
          error={passwordError}
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          helperText={passwordError ? "Senha é obrigatória." : ""}
        />
        <TextField
          select
          label="C"
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Cadastrar
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterForm;
