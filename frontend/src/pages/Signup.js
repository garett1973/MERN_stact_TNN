import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { signup, error, isLoading } = useSignup();
    const [ errorMessage, setErrorMessage ] = useState(error);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrorMessage(null);
            await signup(email, password);
            navigate('/');
        } else {
            setPassword('');
            setConfirmPassword('');
            setErrorMessage('Passwords do not match');
        }
    }
    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label>Email:</label>
            <input 
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
            <label>Password:</label>
            <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            <label>Confirm password:</label>
            <input
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            />
            <button disabled={isLoading}>Sign Up</button>
            {errorMessage && <div className='error'>{errorMessage}</div>}
        </form>
    )
}

export default Signup;