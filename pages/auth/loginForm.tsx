/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert, Typography, Box } from '@mui/material';
import { AlertColor } from '@mui/material';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  // Estados de erro para validação
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Reseta os erros
    setEmailError(false);
    setPasswordError(false);

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

    try {
      const response = await axios.post('/api/users/loginUsers', { email, password });
      
      const data = response.data as { success: boolean };
      if (data.success) {
        setSnackbarMessage('Login realizado com sucesso!');
        setSnackbarSeverity('success');
        // Redirecionar ou salvar token conforme necessário
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setSnackbarMessage(error.response.data.message || 'Erro ao fazer login.');
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
    <Box style={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom align='center'>
        Faça seu login
      </Typography>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
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
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Entrar
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

export default LoginForm;
