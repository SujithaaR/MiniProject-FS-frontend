// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';

const Signup = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user' // default role
    });
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup(userData);
            navigate('/login'); // redirect to login after successful signup
        } catch (err) {
            console.error('Signup failed', err);
        }
    };

    return (
        <div className="container">
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select
                        className="form-control"
                        value={userData.role}
                        onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                        required
                    >
                        <option value="admin">Admin</option>
                        <option value="teamlead">Team Lead</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
