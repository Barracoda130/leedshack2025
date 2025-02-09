import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RenderRegisterForm({ onRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ username, password, email, firstname, surname });
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
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
            />
            <input
                type="text"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    );
}

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegister = async (userData) => {
        try {
            const response = await axios.post('http://localhost:5001/user/register', userData);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div>
            <RenderRegisterForm onRegister={handleRegister} />
        </div>
    );
};

export default RegisterPage;