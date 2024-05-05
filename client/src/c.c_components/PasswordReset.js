import React, { useState } from 'react';
import axios from 'axios';
//const { ManagementClient } = require('auth0');
/*
const auth0 = new ManagementClient({
    domain: 'dev-crsl7fds3e2pp8gg.us.auth0.com',
    clientId: 'qzb196eeCom4w7g9m5gW7IAfRTWAA2qN',
    clientSecret: 'R_c2knm1gZHCGSOxlnpkoElT5vSahQMY1ciS1OikamYUA_kPq35wOaB6_yDTx5VA',
    scope: 'read:users create:users',
    audience: 'https://dev-crsl7fds3e2pp8gg.us.auth0.com/api/v2/', 
    grantType: 'client_credentials'
  });
  */

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
            console.log(response.data.employee);
            //console.log(response.data.employee.isAdmin);
            /*
            auth0.createUser({
                email: response.data.employee.email,
                password: response.data.employee.passwordHash,
                connection: 'Username-Password-Authentication'
              })
              .then(function (user) {
                console.log('User created:', user);
              })
              .catch(function (err) {
                console.error('Error creating user:', err);
              });
              */


            alert('Password reset successfully');
            setCurrentPage('login'); 
        } catch (error) {
            console.error('Error resetting password:', error);
            alert('Failed to reset password');
        }
    };

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "DodgerBlue"
        }}>
            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                borderRadius: "5px",
            }}>
                <h2 style={{ color: "white" }}>Reset Password</h2>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    required
                    style={{
                        padding: "10px",
                        marginBottom: "20px",
                        width: "200px",
                        borderRadius: "5px",
                        border: "none"
                    }}
                />
                <button type="submit" style={{
                    padding: "10px 20px",
                    backgroundColor: "white",
                    color: "DodgerBlue",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px"
                }}>Reset Password</button>
            </form>
        </div>
    );
    
}

export default PasswordReset;
