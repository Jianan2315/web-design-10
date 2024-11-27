import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user); // Get logged-in user from Redux

    const handleLogout = () => {
        dispatch(logout()); // Clear user state in Redux
        navigate('/'); // Redirect to the home page after logout
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Job Portal
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/about">
                    About
                </Button>
                <Button color="inherit" component={Link} to="/contact">
                    Contact
                </Button>
                <Button color="inherit" component={Link} to="/companies">
                    Companies
                </Button>

                {/* Conditional rendering based on user role */}
                {user?.type === 'admin' && (
                    <>
                        <Button color="inherit" component={Link} to="/admin/employees">
                            Employees
                        </Button>
                        <Button color="inherit" component={Link} to="/admin/add-job">
                            Add Job
                        </Button>
                    </>
                )}
                {user?.type === 'employee' && (
                    <Button color="inherit" component={Link} to="/jobs">
                        Jobs
                    </Button>
                )}

                {/* Show login or logout button dynamically */}
                {!user ? (
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                ) : (
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                )}

                {/* Optional: Display a welcome message for the logged-in user */}
                {user && (
                    <Typography variant="body1" sx={{ marginLeft: '1rem' }}>
                        Welcome, {user.fullName || user.email}!
                    </Typography>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
