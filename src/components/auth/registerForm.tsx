/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert, MenuItem, Typography, Box } from '@mui/material';
import { AlertColor } from '@mui/material';
import axios from 'axios';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const roles = [
  { value: 'user', label: 'Usuário' },
  { value: 'admin', label: 'Administrador' },
];

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [role, setRole] = useState('user');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  // Estados de erro e mensagens de ajuda
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Reseta os erros
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setContactNumberError(false);

    // Validação simples
    if (name === '' || !/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) {
      setNameError(true);
      setSnackbarMessage('O nome deve conter apenas letras e espaços.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    if (email === '' || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError(true);
      setSnackbarMessage('Por favor, insira um e-mail válido.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    if (password === '' || !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;'"<>,.?/~`-])[A-Za-z\d!@#$%^&*()_+={}[\]:;'"<>,.?/~`-]{5,}$/.test(password)) {
      setPasswordError(true);
      setSnackbarMessage('A senha deve conter pelo menos 5 caracteres, incluindo letras, números e caracteres especiais.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    if (contactNumber === '' || !/^\d{11}$/.test(contactNumber)) {
      setContactNumberError(true);
      setSnackbarMessage('Por favor, insira um número de telefone válido com 11 dígitos.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    // Definir o status com base no papel do usuário
    const userStatus = role === 'admin' ? false : true;  // 'admin' recebe false, 'user' recebe true

    const userData = { name, email, password, contactNumber, role, status: userStatus };

    try {
      const response = await axios.post('/api/users/newUser', userData);

      setSnackbarMessage('Cadastro realizado com sucesso!');
      setSnackbarSeverity('success');
      // Limpar os campos após o sucesso
      setName('');
      setEmail('');
      setPassword('');
      setContactNumber('');
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
    <Box style={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom align='center' className='flex flex-col items-center gap-3 font-bold text-customBlue'>
        <AccountCircleRoundedIcon sx={{fontSize: 50}}/>
        CADASTRO
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
          helperText={nameError ? "O nome deve conter apenas letras e espaços." : ""}
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
          helperText={emailError ? "Por favor, insira um e-mail válido." : ""}
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
          helperText={passwordError ? "A senha deve conter pelo menos 5 caracteres, incluindo letras, números e caracteres especiais." : ""}
        />
        <TextField
          error={contactNumberError}
          label="Telefone"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
          helperText={contactNumberError ? "Por favor, insira um número de telefone válido com 11 dígitos." : ""}
        />
        <TextField
          select
          label="Perfil"
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