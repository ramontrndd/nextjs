import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Avatar, Chip, Paper, Container, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import { UserInterface } from '@/interfaces/user';

const ProfileItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 400,
  fontWeight: 'bold',
  
  gap: theme.spacing(2),
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto',
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[3],
}));

const CenteredCard = styled(Card)(({ theme }) => ({
  maxWidth: 450,
  margin: '0 auto',
  backgroundColor: theme.palette.background.default,
}));

interface UserProfileProps {
  userProfile: UserInterface | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ userProfile }) => {
  if (!userProfile) {
    return <Typography variant="body1">Selecione um item do menu para ver os detalhes.</Typography>;
  }

  return (
    <Container  sx={{ 
      py: 4, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%',
     
    }}>
      <CenteredCard elevation={3}>
        <CardContent>
        <Grid sx={{ xs: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: 400 }}>

            <Grid sx={{  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <ProfileAvatar src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1730871777~exp=1730875377~hmac=66972d9b1d929255dcc11e7534a0717ea665155f12b29840c296e6c173c32332&w=826" />
              <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                {userProfile.name}
              </Typography>
              <Chip
                label={userProfile.role === 'admin' ? 'Admin' : 'User'}
                color={userProfile.role === 'admin' ? 'error' : 'success'}
                size="small"
              />
            </Grid>

            <Grid sx={{ width: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <ProfileItem elevation={2}>
                <PersonIcon color="primary" />
                <Typography>{userProfile.name}</Typography>
              </ProfileItem>
            </Grid>

            <Grid sx={{ width: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <ProfileItem elevation={2}>
                <PhoneIcon color="primary" />
                <Typography>{userProfile.contactNumber}</Typography>
              </ProfileItem>
            </Grid>

            <Grid sx={{ xs: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <ProfileItem elevation={2}>
                <EmailIcon color="primary" />
                <Typography>{userProfile.email}</Typography>
              </ProfileItem>
            </Grid>

            <Grid sx={{ xs: 20 ,display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <ProfileItem elevation={2}>
                <WorkIcon color="primary" />
                <Typography>{userProfile.role}</Typography>
              </ProfileItem>
            </Grid>
          </Grid>
        </CardContent>
      </CenteredCard>
    </Container>
  );
};

export default UserProfile;