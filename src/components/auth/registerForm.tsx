/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Typography, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { ApiResponse } from '@/interfaces/apiResponse';
import { UserInterface } from '@/interfaces/user';

const roles = [
  { value: 'user', label: 'Usuário' },
  { value: 'admin', label: 'Administrador' },
];

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');

  // Estados de erro e mensagens de ajuda
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
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
      password !== '' &&
      contactNumber !== '' &&
      !nameError &&
      !emailError &&
      !passwordError &&
      !contactNumberError
    );
  }, [name, email, password, contactNumber, nameError, emailError, passwordError, contactNumberError]);

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
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          setEmailError('Por favor, insira um e-mail válido.');
        } else {
          setEmailError('');
        }
        break;
      case 'password':
        if (password === '') {
          setPasswordError('Senha é obrigatória.');
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;'"<>,.?/~`-])[A-Za-z\d!@#$%^&*()_+={}[\]:;'"<>,.?/~`-]{5,}$/.test(password)) {
          setPasswordError('A senha deve conter pelo menos 5 caracteres, incluindo letras, números e caracteres especiais.');
        } else {
          setPasswordError('');
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
    handleBlur('password');
    handleBlur('contactNumber');

    if (nameError || emailError || passwordError || contactNumberError) {
      return;
    }

    // Definir o status com base no papel do usuário
    const userStatus = role === 'admin' ? false : true;  // 'admin' recebe false, 'user' recebe true

    const userData: UserInterface = { name, email, password, contactNumber, role, status: userStatus };

    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponse<UserInterface>>('/api/users/newUser', userData);
      if (response.data.success) {
        // Limpar os campos após o sucesso
        setName('');
        setEmail('');
        setPassword('');
        setContactNumber('');
        setRole('user');
        // Exibir mensagem de sucesso
        setSnackbarMessage('Cadastro realizado com sucesso!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage(response.data.message || 'Erro ao cadastrar.');
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
    return 'Erro ao cadastrar.';
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom align='center' className='flex flex-col items-center gap-3 font-bold text-customBlue'>
        <AccountCircleRoundedIcon sx={{ fontSize: 50 }} />
        CADASTRO
      </Typography>
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
          inputProps={{ pattern: "^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$" }}
        />
        <TextField
          error={!!passwordError}
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur('password')}
          required
          helperText={passwordError}
          placeholder="Digite uma senha (mínimo 5 caracteres)"
          inputProps={{ pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()_+={}\\[\\]:;\"'<>,.?/~`-])[A-Za-z\\d!@#$%^&*()_+={}\\[\\]:;\"'<>,.?/~`-]{5,}$" }}
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
        <Button variant="contained" color="primary" type="submit" fullWidth disabled={!isFormValid || isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
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
    </Box>
  );
};

export default RegisterForm;