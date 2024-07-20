import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Import the CSS file

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://punisher-website.free.nf/news_backend/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),
        });

        const data = await response.json();

        if (data.success) {
            // Store token or session information
            localStorage.setItem('authToken', data.token);
            navigate('/admintools');
        } else {
            setMessage('Login failed: ' + data.message);
        }
    };

    return (
        <div id="login-container">
            <div id="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div id="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div id="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button id='bt' type="submit">Log in</button>
                </form>
                {message && <p id="message">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
