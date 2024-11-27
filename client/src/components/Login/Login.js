import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import axios from '../../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook for navigation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user/login', { email, password });
            dispatch(login(response.data.user)); // Save user details in Redux
            setMessage('Login successful');

            // Navigate based on user type
            if (response.data.user.type === 'admin') {
                navigate('/admin/employees'); // Redirect admin to Employees page
            } else if (response.data.user.type === 'employee') {
                navigate('/jobs'); // Redirect employee to Jobs page
            }
        } catch (error) {
            setMessage('Login failed. Please check your credentials.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
