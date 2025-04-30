import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cleaning Service
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button color="inherit" onClick={() => navigate('/admin')}>
           Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
};