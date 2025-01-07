import React, {useState} from "react";
import axios from 'axios';
import { API_BASE_URL } from '../config';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState ('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post(`${API_BASE_URL}/login`, {email, password});
            console.log('Logins succesful', response.data);
        } catch (error) {
            setError('There was an error logging in');
            console.error(error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p className="alert alert-danger">{error}</p>}
            <div className="form-group">
                <label>Email</label>
                <input type='email' className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Password</label>
                <input type='password' className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type='submit' className="btn btn-primary">Login</button>
        </form>
    );
};

export default LoginForm;