import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import axiosAuth from './api/axios-auth';

function RenderThis({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
}

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5001/user/login', { 
                username, password 
            });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');  
        } catch (error) {
            console.error('Login failed', error.response.data);
        }
    };

    const logout = () => {
        axiosAuth.post('/user/logout');
        localStorage.removeItem('token');
    };

    return (
        <div>
            <RenderThis onLogin={handleLogin} />
            <button onClick={logout}></button>
        </div>
    );
};

export default LoginPage;