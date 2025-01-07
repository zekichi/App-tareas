import React, {useState} from "react";
import axios from 'axios';
import { API_BASE_URL } from "../config";

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            console.error('Passwords do not mathc');
            return;
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, {username, email, password});
            console.log('Registration successful', response.data);
        } catch (error) {
            setError('There was an error registering your account');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p className="alert alert-danger">{error}</p>}
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    );
};

export default RegisterForm;