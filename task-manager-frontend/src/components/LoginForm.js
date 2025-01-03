import React, {useState} from "react";
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState ('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post('/login', {email, password});
            console.log('Logins succesful', response.data);
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
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