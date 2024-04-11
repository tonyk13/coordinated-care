import React, { useState } from 'react';
import axios from 'axios';

function PasswordReset({ setCurrentPage, token}) {
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log()
            const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
		    const apiUrl = `${baseURL}/api/reset-password`;

            const response = await axios.post(apiUrl, { token, password });
            console.log(response.data);
            alert('Password reset successfully');
            setCurrentPage('login'); 
        } catch (error) {
            console.error('Error resetting password:', error);
            alert('Failed to reset password');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default PasswordReset;
