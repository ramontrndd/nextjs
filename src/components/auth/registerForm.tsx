/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { UserInterface } from '@/interfaces/user';

interface RegisterFormProps {
  user?: UserInterface;
  onSave: (user: UserInterface) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ user, onSave }) => {
  const [formData, setFormData] = useState<UserInterface>({
    name: '',
    email: '',
    password: '',
    contactNumber: 0,
    status: false,
    role: 'user',
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (user) {
      const isUpdated = 
        formData.name !== user.name ||
        formData.email !== user.email ||
        formData.contactNumber !== user.contactNumber ||
        formData.role !== user.role;
      setIsFormValid(isUpdated);
    } else {
      const isValid = 
        formData.name !== '' &&
        formData.email !== '' &&
        formData.password !== '' &&
        formData.contactNumber !== 0;
      setIsFormValid(isValid);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        name="name"
        label="Nome"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {!user && (
        <TextField
          name="password"
          label="Senha"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      )}
      <TextField
        name="contactNumber"
        label="Telefone"
        value={formData.contactNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={!isFormValid}>
        {user ? 'Salvar Alterações' : 'Registrar'}
      </Button>
    </Box>
  );
};

export default RegisterForm;