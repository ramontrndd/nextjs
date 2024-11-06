import React from 'react';
import { Typography, Box, Container, Paper } from '@mui/material';

const HomeComponent: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, textAlign: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Bem-vindo ao Gerenciador de Usuários!
          </Typography>
          <Typography variant="body1">
            Aqui você pode gerenciar seus usuários, visualizar perfis, editar informações e muito mais.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomeComponent;