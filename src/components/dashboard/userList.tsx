/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  TextField,
  TablePagination,
  Snackbar,
  Alert,
  AlertColor,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { UserInterface } from '@/interfaces/user';
import ToggleStatusButton from '@/components/shared/toggleStatusButton';
import DeleteUserButton from '@/components/shared/deleteUserButton';
import EditUserButton from '@/components/shared/editUserButtonProps';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ApiResponse } from '@/interfaces/apiResponse';

const GradientTypography = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(2),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.grey[50],
    fontWeight: 600,
  },
}));

interface UserListProps {
  users: UserInterface[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>(users);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const showMessage = (message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleStatusChange = (userId: string, newStatus: boolean) => {
    setFilteredUsers(filteredUsers.map(user => 
      user._id === userId ? { ...user, status: newStatus } : user
    ));
    showMessage('Status do usuário atualizado com sucesso', 'success');
  };

  const handleDelete = (userId: string) => {
    setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
    showMessage('Usuário deletado com sucesso', 'success');
  };

  const handleSave = async (updatedUser: UserInterface) => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      const response = await axios.patch<ApiResponse<UserInterface>>(`/api/users/updateUser`, { userId: updatedUser._id, ...updatedUser }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setFilteredUsers(filteredUsers.map(user => 
          user._id === updatedUser._id ? response.data.data : user
        ));
        showMessage('Usuário atualizado com sucesso', 'success');
      } else {
        showMessage(response.data.message || 'Falha ao atualizar usuário', 'error');
      }
    } catch (error: any) {
      showMessage(error.response?.data?.message || 'Erro de conexão com o servidor', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setPage(0);
  }, [searchTerm, users]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Box sx={{ mb: 4 }}>
        <GradientTypography variant="h2">
          Lista de Usuários
        </GradientTypography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Gerencie os usuários do seu sistema de forma simples e eficiente.
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar usuários..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Telefone</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ '&:hover': { backgroundColor: 'grey.50' } }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.contactNumber}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status ? 'Ativo' : 'Inativo'}
                      size="small"
                      color={user.status ? 'success' : 'error'}
                      sx={{
                        backgroundColor: user.status ? 'success.light' : 'error.light',
                        color: user.status ? 'success.dark' : 'error.dark',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      size="small"
                      sx={{
                        backgroundColor: 'primary.light',
                        color: 'primary.dark',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <EditUserButton user={user} onSave={handleSave} />
                    <DeleteUserButton userId={user._id || ''} onDelete={handleDelete} />
                    <ToggleStatusButton key={`toggle-${user._id}`} userId={user._id || ''} currentStatus={user.status} onStatusChange={handleStatusChange} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </Container>
  );
};

export default UserList;