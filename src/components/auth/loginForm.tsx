/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/auth/loginForm.tsx

"use client";
import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, Alert, Typography, Box } from '@mui/material';
import { AlertColor } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [loginSuccess, setLoginSuccess] = useState(false);  

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
        setOpenSnackbar(true);
        
        setLoginSuccess(true);  
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setSnackbarMessage(error.response.data.message || 'Erro ao fazer login.');
      } else {
        setSnackbarMessage('Erro de rede.');
      }
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (loginSuccess) {
      router.push('/dashboard'); // Redirecionando corretamente para o caminho do dashboard
    }
  }, [loginSuccess, router]);

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