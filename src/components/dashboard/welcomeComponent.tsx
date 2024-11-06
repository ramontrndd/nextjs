import React from 'react';
import { Typography, Box } from '@mui/material';

const WelcomeComponent: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao Gerenciador de Usuários!
      </Typography>
      <Typography variant="body1">
        Aqui você pode gerenciar seus usuários, visualizar perfis, editar informações e muito mais.
      </Typography>
    </Box>
  );
};

export default WelcomeComponent;