/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, Alert, Typography, Box } from '@mui/material';
import HttpsIcon from '@mui/icons-material/Https';
import { AlertColor } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

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

  useEffect(() => {
    // Verifica se há uma mensagem de alerta no localStorage
    const authMessage = localStorage.getItem('authMessage');
    if (authMessage) {
      setSnackbarMessage(authMessage);
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      localStorage.removeItem('authMessage'); // Remove a mensagem do localStorage após exibir
    }
  }, []);

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
      const response = await axios.post('/api/users/loginUser', { email, password });
      
      const data = response.data as { success: boolean, token?: string, message?: string };

      // Verifica se o status é pendente (não aprovado)
      if (response.status === 403) {
        setSnackbarMessage('Sua conta ainda está pendente de aprovação.');
        setSnackbarSeverity('warning');
        setOpenSnackbar(true);
        return;
      }

      if (data.success && data.token) {
        // Salva o token nos cookies
        Cookies.set('token', data.token, { expires: 1 }); // O token expira em 1 dia

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
      <Typography variant="h4" gutterBottom align='center' className='flex flex-col items-center gap-3 font-bold font text-customBlue'>
      <HttpsIcon  sx={{ fontSize: 50 }}/>
      LOGIN
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